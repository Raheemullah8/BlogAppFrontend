import React from "react";

function CommentList() {
  // Dummy data (API se ayega)
  const comments = [
    {
      id: 1,
      user: { name: "Ali Khan", img: "https://i.pravatar.cc/40?img=1" },
      text: "Great explanation of hooks!",
    },
    {
      id: 2,
      user: { name: "Sara Ahmed", img: "https://i.pravatar.cc/40?img=2" },
      text: "This really helped me understand useEffect.",
    },
  ];

  return (
    <div className="space-y-4">
      {comments.map((c) => (
        <div key={c.id} className="flex gap-3 items-start p-3 bg-base-200 rounded-lg">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={c.user.img} alt={c.user.name} />
            </div>
          </div>
          <div>
            <p className="font-semibold">{c.user.name}</p>
            <p className="text-gray-600">{c.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
