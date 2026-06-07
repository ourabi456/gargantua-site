// ---------------------------------------------------------------------------
// TEAM ROSTER — 6 members.
// Portrait images are coming shortly. Drop each file into:
//     public/assets/team/   (e.g. member-1.png)
// and the card will pick it up automatically. Until then a stylised
// placeholder frame is shown. Edit names / roles / bios freely.
// ---------------------------------------------------------------------------

export const TEAM = [
  {
    id: 1,
    name: "TEAM MEMBER 01", // TODO: real name
    role: "Game Director / Design",
    bio: "Placeholder bio — owned the vision for Gargantua's world, narrative arc and the spare-or-strike ending.",
    photo: "/assets/team/member-1.png", // TODO: drop portrait here
  },
  {
    id: 2,
    name: "TEAM MEMBER 02",
    role: "Gameplay Programming",
    bio: "Placeholder bio — built the engine: physics, the host-authoritative LAN co-op, and the boss simulation.",
    photo: "/assets/team/member-2.png",
  },
  {
    id: 3,
    name: "TEAM MEMBER 03",
    role: "Art & Environments",
    bio: "Placeholder bio — painted the dying desert, the underground, and the surface of Gargantua.",
    photo: "/assets/team/member-3.png",
  },
  {
    id: 4,
    name: "TEAM MEMBER 04",
    role: "Character & Animation",
    bio: "Placeholder bio — rigged Cooper, Anna and the thing that wears Dr. Mann's face.",
    photo: "/assets/team/member-4.png",
  },
  {
    id: 5,
    name: "TEAM MEMBER 05",
    role: "Audio & Music",
    bio: "Placeholder bio — scored the silence before Gargantua and every world's theme.",
    photo: "/assets/team/member-5.png",
  },
  {
    id: 6,
    name: "TEAM MEMBER 06",
    role: "Levels & Systems",
    bio: "Placeholder bio — designed the levels, quizzes, pickups and the final-choice flow.",
    photo: "/assets/team/member-6.png",
  },
];

// ---------------------------------------------------------------------------
// LINKS — everything the QR code points people to.
// The YouTube capture is live. Replace each "#" with the real URL, then
// redeploy (the Connect section + QR target pick it up automatically).
// Any link still set to "#" renders as a dimmed "coming soon" tile.
// ---------------------------------------------------------------------------
export const SOCIALS = {
  youtube: "https://www.youtube.com/watch?v=wieCLKCkjiM", // gameplay capture (live)
  instagram: "https://www.instagram.com/gargantua2189/",   // the game (live)
  instagramCrew: "https://www.instagram.com/astro.crew.2026/", // Astro Crew team (live)
  tiktok: "#",          // TODO: TikTok profile URL
  website: "https://github.com/ourabi456/gargantua-site/releases/download/v1.0.0/GARGANTUA-win64.zip", // game download (Windows v1.0)
  feedback: "/feedback", // native on-site feedback form (see app/feedback)
};

// Web3Forms access key for the native /feedback form (free, no backend).
// Get one in 10s at https://web3forms.com/ (enter the email you want feedback
// sent to → key is emailed instantly), paste it here, redeploy. Until then the
// form shows a "being set up" notice.
export const FEEDBACK_KEY = "86ac2352-133b-4668-ba1d-b27a904d2d8c"; // Web3Forms access key
