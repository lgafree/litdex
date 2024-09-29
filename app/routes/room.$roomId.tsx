import { useLoaderData, useLocation } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  return json({ roomId: params.roomId });
};

export default function RoomDetail() {
  const { roomId } = useLoaderData<typeof loader>();
  const location = useLocation();
  const room = location.state?.room;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-primary">Room Details</h1>
      <pre className="bg-secondary text-secondary-foreground p-4 rounded-md overflow-auto">
        {JSON.stringify(room || { id: roomId, error: "Room data not available" }, null, 2)}
      </pre>
    </div>
  );
}
