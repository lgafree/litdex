import React from 'react';

interface InfoTabProps {
  user: any; // Replace 'any' with a proper user type
}

const InfoTab: React.FC<InfoTabProps> = ({ user }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Age:</strong> {user.age || 'Unknown'}</p>
        <p><strong>Birthday:</strong> { new Date(user.birthdate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Unknown'}</p>
        <p><strong>Gender:</strong> {user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Unknown'}</p>
        <p><strong>Country:</strong> {user.country ? user.country : 'Unknown'}</p>
        <p><strong>Country:</strong> {user.country ? user.region.toUpperCase() : 'Unknown'}</p>
        <p><strong>Joined:</strong> { new Date(user.create_time * 1000).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) || 'Unknown'}</p>
        <p><strong>Country of IP:</strong> {user.ip_country || 'Unknown'}</p>
        <p><strong>City of IP:</strong> {user.ip_city || 'Unknown'}</p>
        <p><strong>Cross Region:</strong> {user.cross_region === true ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default InfoTab;
