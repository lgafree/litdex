import { useState } from "react";
import { Form, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "~/components/ui/label";
import { searchUsers, searchRooms } from "~/lib/api";

export function Search() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"users" | "rooms">("users");
  const navigate = useNavigate();

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const query = formData.get("query") as string;

    if (query) {
      try {
        let result;
        if (searchType === "users") {
          result = await searchUsers(query);
          if (result && result.length > 0) {
            navigate(`/user/${result[0].user_id}`);
          } else {
            setError("No user found");
          }
        } else if (searchType === "rooms") {
          result = await searchRooms(query);
          if (result.length > 0) {
            navigate(`/room/${result[0].id}`, { state: { room: result[0] } });
          } else {
            setError("No room found");
          }
        }
      } catch (err) {
        setError(`Failed to fetch ${searchType} data`);
        console.error(`Error fetching ${searchType} data:`, err);
      }
    }
    setIsLoading(false);
  };

  const getPlaceholder = () => {
    return searchType === "users" ? "Enter user ID..." : "Enter room ID...";
  };

  return (
    <div className="w-full">
      <Form onSubmit={handleSearch} className="space-y-4">
        <RadioGroup 
          defaultValue="users" 
          name="type" 
          className="mb-4"
          onValueChange={(value) => setSearchType(value as "users" | "rooms")}
        >
          <div className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="users" id="users" />
              <Label htmlFor="users">Users</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rooms" id="rooms" />
              <Label htmlFor="rooms">Rooms</Label>
            </div>
          </div>
        </RadioGroup>
        <div>
          <Input
            type="text"
            name="query"
            placeholder={getPlaceholder()}
            pattern="[0-9]+"
            title="Please enter a numeric ID"
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}      
    </div>
  );
}
