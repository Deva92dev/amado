export interface SocialPost {
  id: number;
  user: {
    name: string;
    username: string;
    avatarUrl: string;
    verified: boolean;
  };
  imageUrl: string;
  imageAlt: string;
  aspectRatio: "square" | "tall" | "wide";
  likes: number;
  comments: number;
}

export const socialPosts: SocialPost[] = [
  {
    id: 1,
    user: {
      name: "Elena",
      username: "@elena_style",
      avatarUrl:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: true,
    },
    imageUrl:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "A woman in a stylish white dress",
    aspectRatio: "tall",
    likes: 1250,
    comments: 89,
  },
  {
    id: 2,
    user: {
      name: "Marcus",
      username: "@marcus_looks",
      avatarUrl:
        "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: false,
    },
    imageUrl:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "A man in a trendy jacket leaning against a wall",
    aspectRatio: "square",
    likes: 845,
    comments: 45,
  },
  {
    id: 3,
    user: {
      name: "Liam",
      username: "@liam_fits",
      avatarUrl:
        "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: false,
    },
    imageUrl:
      "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt:
      "A collection of stylish leather shoes and a belt on a wooden surface",
    aspectRatio: "wide",
    likes: 980,
    comments: 65,
  },
  {
    id: 4,
    user: {
      name: "Sophia",
      username: "@sophia_threads",
      avatarUrl:
        "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: true,
    },
    imageUrl:
      "https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Full-body shot of a woman in a flowing floral dress in a garden",
    aspectRatio: "tall",
    likes: 3200,
    comments: 240,
  },
  {
    id: 5,
    user: {
      name: "Noah",
      username: "@noah_essentials",
      avatarUrl:
        "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: false,
    },
    imageUrl:
      "https://images.pexels.com/photos/1342609/pexels-photo-1342609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Man wearing a minimalist watch and a crisp shirt",
    aspectRatio: "square",
    likes: 720,
    comments: 30,
  },
  {
    id: 6,
    user: {
      name: "Chloe",
      username: "@chloe_styles",
      avatarUrl:
        "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: true,
    },
    imageUrl:
      "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Woman in a black attire holding a black purse",
    aspectRatio: "square",
    likes: 1240,
    comments: 55,
  },
  {
    id: 7,
    user: {
      name: "Liam",
      username: "@liam_fits",
      avatarUrl:
        "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: false,
    },
    imageUrl:
      "https://images.pexels.com/photos/1102219/pexels-photo-1102219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt: "Close-up detail of a woman's classic purse",
    aspectRatio: "square",
    likes: 980,
    comments: 42,
  },
  {
    id: 8,
    user: {
      name: "TechGear",
      username: "@techgear_official",
      avatarUrl:
        "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      verified: true,
    },
    imageUrl:
      "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    imageAlt:
      "A panoramic view of a clean workspace featuring a laptop, wireless headphones, a smartphone, and a smartwatch, arranged neatly.",
    aspectRatio: "wide",
    likes: 4500,
    comments: 250,
  },
];
