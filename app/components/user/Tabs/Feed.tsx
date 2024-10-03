import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardDescription } from '~/components/ui/card';
import { Spinner } from '~/components/ui/spinner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Badge } from '~/components/ui/badge';
import { FaHeart, FaComment, FaRetweet, FaThumbtack, FaSpotify, FaMapMarkerAlt } from 'react-icons/fa'; 
import { Feed } from '~/types/feed';
import { getFeed } from '~/lib/api';
import { formatEpochToDateTime, processContent, calculateVotePercentage } from '~/lib/utils';
import { Progress } from "~/components/ui/progress";

interface FeedTabProps {
  userId: string;
  openFullscreen: (imageUrl: string) => void;
}

const FeedTab: React.FC<FeedTabProps> = ({ userId, openFullscreen }) => {
  const [pinned, setPinned] = useState<Feed>();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextStart, setNextStart] = useState<string>('')
  const loader = useRef<HTMLDivElement | null>(null);
  const BASE_FILE_URL = "https://baishan.ksztagent.com/api/sns/v1/lit";
  const [expandedTimes, setExpandedTimes] = useState<Set<string>>(new Set());

  const toggleTimeDisplay = (feedId: string) => {
    setExpandedTimes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feedId)) {
        newSet.delete(feedId);
      } else {
        newSet.add(feedId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchInitialFeeds = async () => {
      try {
        const result = await getFeed(userId, '2147483647'); //litmatch default start_ts epoch
        let initialFeeds = result.feeds
        setPinned(result?.pinned);

        if (result?.pinned) {
          initialFeeds = initialFeeds.filter((feed: {id: string}) => feed.id !== result.pinned.id);
          initialFeeds = [{ ...result.pinned, pinned: true }, ...initialFeeds];
        }

        setFeeds(initialFeeds);
        setHasMore(result.has_next);
        setNextStart(result.next_start);

        
      } catch (error) {
        console.error("Error fetching feeds:", error);
      }
    };

    fetchInitialFeeds();
  }, [userId]);

  const loadMoreFeeds = useCallback(async () => {
    try {
      const result = await getFeed(userId, nextStart);
      let newFeeds = result.feeds;

      if (pinned) {
        newFeeds = newFeeds.filter((feed: {id: string}) => feed.id !== pinned.id);
      }

      setFeeds((prev) => [...prev, ...newFeeds]);
      setHasMore(result.has_next);
      setNextStart(result.next_start);
    } catch (error) {
      console.error("Error loading more feeds:", error);
    }
  }, [userId, nextStart, pinned]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreFeeds();
        }
      },
      { threshold: 1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
      return () => {
        observer.unobserve(currentLoader);
      };
    }
  }, [hasMore, feeds, loadMoreFeeds]);

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody>
            {feeds.map((feed) => (
              <tr key={feed.id}>
                <td colSpan={3} className="p-2">
                  <Card className="flex flex-col">
                    <CardHeader>
                      <div className="flex items-center space-x-2">
                        {feed.pinned && (
                          <div className="flex items-center mr-2">
                            <FaThumbtack className="h-4 w-4 mr-1" />
                            <span className="font-bold text-xs">Pinned</span>
                          </div>
                        )}
                        <CardDescription 
                          onClick={() => toggleTimeDisplay(feed.id)}
                          className="cursor-pointer hover:underline"
                        >
                          {expandedTimes.has(feed.id) 
                            ? formatEpochToDateTime(feed.create_time.time)
                            : feed.create_time.time_desc}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {feed.tags && feed.tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap">
                          {feed.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <p
                        className="user-bio"
                        dangerouslySetInnerHTML={{ __html: processContent(feed.content) }}
                      />
                      {feed.pics.length > 0 && (
                        <Carousel className="mt-2 w-full max-w-xs mx-auto relative">
                          <CarouselContent>
                            {feed.pics.map((pic, index) => (
                              <CarouselItem key={index}>
                                <img
                                  src={`${BASE_FILE_URL}/image/${pic}`}
                                  alt={`Feed pic ${index + 1}`}
                                  className="w-full h-auto rounded"
                                  onClick={() => openFullscreen(`${BASE_FILE_URL}/image/${pic}`)}
                                />
                              </CarouselItem>
                            ))}
                          </CarouselContent>
                          {feed.pics.length > 1 && (
                            <>
                              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2" />
                              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2" />
                            </>
                          )}
                        </Carousel>
                      )}
                      {feed.audios && feed.audios.length > 0 && (
                        <div className="mt-2 p-2 rounded">
                          <audio
                            src={`${BASE_FILE_URL}/audio/${feed.audios[0]}`}
                            controls
                            className="w-full"
                          >
                            Your browser does not support the audio element.
                          </audio>
                        </div>
                      )}
                      {feed.extras && feed.extras.activity_info && (
                        <a href={feed.extras.activity_info.url} className="mt-2 flex items-center bg-gray-300 dark:bg-gray-800 rounded-lg p-2">
                          <img 
                            src={`${BASE_FILE_URL}/image/${feed.extras.activity_info.icon}`} 
                            alt="Spotify Track" 
                            className="w-12 h-10 rounded-md mr-3"
                          />
                          <p className="text-xs text-gray-600 dark:text-gray-400 flex" dangerouslySetInnerHTML={{__html: processContent(feed.extras.activity_info.content)}}/>
                        </a>
                      )}
                      {feed.extras && feed.extras.spotify_info && (
                        <div className="mt-2 flex items-center bg-gray-300 dark:bg-gray-800 rounded-lg p-2">
                          <img 
                            src={feed.extras.spotify_info.image} 
                            alt="Spotify Track" 
                            className="w-16 h-16 rounded-md mr-3"
                          />
                          <div>
                            <p className="font-semibold">{feed.extras.spotify_info.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <FaSpotify className="mr-1 text-[#1DB954]" />
                              {feed.extras.spotify_info.artist}
                            </p>
                          </div>
                        </div>
                      )}
                      {feed.is_vote && (
                        <div className="mt-4 p-2 border rounded-lg">
                          {feed.vote_topic ? (
                            <>
                              <div className="mb-2 text-xs">
                                {feed.vote_topic}
                              </div>
                              <div className="flex justify-between space-x-4">
                                {feed.vote_options.map((option, index) => {
                                  const percentages = calculateVotePercentage(feed.votes, feed.vote_num);
                                  return (
                                    <div key={index} className="w-1/2">
                                      <div className="h-48 overflow-hidden rounded-lg">
                                        <img 
                                          src={`${BASE_FILE_URL}/image/${option}`} 
                                          alt={`Option ${index + 1}`} 
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex justify-between mt-2">
                                        <span className="text-xs">{index === 0 ? 'This' : 'That'}</span>
                                        <span className="text-xs">{percentages[index]}%</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="text-center mt-1 text-xs text-gray-600 dark:text-gray-400">
                                Total votes: {feed.vote_num}
                              </div>
                            </>
                          ) : (
                            <div className="text-gray-500">
                              {feed.vote_options?.map((option, index) => {
                                const percentages = calculateVotePercentage(feed.votes, feed.vote_num);
                                return (
                                  <div key={index} className="mt-2">
                                    <div className="flex justify-between text-xs mb-1">
                                      <span>{String.fromCharCode(65 + index)}. {option}</span>
                                      <span>{percentages[index]}%</span>
                                    </div>
                                    <Progress value={percentages[index]} className="h-2" />
                                  </div>
                                );
                              })}
                              <div className="text-center mt-3 text-xs text-gray-600 dark:text-gray-400">
                                Total votes: {feed.vote_num}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                    {feed.location && (
                      <div className="flex items-center px-4 text-xs text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                        {feed.location}
                      </div>
                    )}
                    <div className="flex items-center justify-end px-4 py-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <FaHeart className="h-4 w-4 text-red-500" />
                          <span className="ml-1 text-xs">{feed.reaction_num}</span>
                        </div>
                        <div className="flex items-center">
                          <FaComment className="h-4 w-4 text-blue-500" />
                          <span className="ml-1 text-xs">{feed.comment_num}</span>
                        </div>
                        <div className="flex items-center">
                          <FaRetweet className="h-4 w-4 text-green-500" />
                          <span className="ml-1 text-xs">{feed.repost_num}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </td>
              </tr>
            ))}
            {feeds.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    This user hasn't posted any content yet.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    When they do, their posts will show up here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div ref={loader} className="flex justify-center py-4">
          <Spinner size={24} />
        </div>
      )}
    </div>
  );
};

export default FeedTab;