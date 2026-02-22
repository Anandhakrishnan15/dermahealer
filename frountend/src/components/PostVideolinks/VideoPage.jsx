// SimpleVideoCards.js
import { Play } from "lucide-react";

const videos = [
    { url: "https://youtube.com/shorts/1Zm0olMiQng?si=_oVNaglmKmDmCo5Z", title: "Shorts Video 1" },
    { url: "https://youtube.com/shorts/hfz5xTD9ZoQ?si=tno4m2l8MQzqPiPz", title: "Shorts Video 2" },
    { url: "https://youtube.com/shorts/VJEuGhjN0T4?si=62za3vetY3bKVmQw", title: "Normal Video 2" },
    { url: "https://youtube.com/shorts/LiweRtj5GhE?si=yCkldRssizBgjwml", title: "Embedded Video 1" },
];

// Helper function to get YouTube video ID
const getYouTubeID = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Helper function to check if a video is Shorts
const isShorts = (url) => url.includes("/shorts/");

export const SimpleVideoCards = () => {
    return (
        <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Video Cards</h1>

            <div className="flex flex-wrap justify-center gap-4">
                {videos.map((video, index) => {
                    const videoId = getYouTubeID(video.url);
                    const thumbnail = videoId
                        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                        : "https://via.placeholder.com/480x360?text=No+Thumbnail";

                    return (
                        <a
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer relative"
                        >
                            <div className="relative">
                                <img
                                    src={thumbnail}
                                    alt={video.title}
                                    className="w-full h-80 object-cover"
                                />
                                {/* Shorts badge */}
                                {isShorts(video.url) && (
                                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                                        SHORTS
                                    </span>
                                )}
                                {/* Play overlay */}
                                <div className="absolute inset-0  bg-opacity-20 flex items-center justify-center">
                                    <Play className="text-white w-6 h-6 hover:text-red-500" />
                                </div>
                            </div>
                           
                        </a>
                    );
                })}
            </div>
        </div>
    );
};