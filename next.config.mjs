/** @type {import('next').NextConfig} */
const config = {
  devIndicators: false,
  images: {
    localPatterns: [
      {
        pathname: "/media/**",
      },
    ],
  },
};

export default config;
