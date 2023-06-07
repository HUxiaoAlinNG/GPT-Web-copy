/*
 * @Author: hiLin 123456
 * @Date: 2023-05-12 22:19:28
 * @LastEditors: hilin hilin
 * @LastEditTime: 2023-06-07 17:19:29
 * @FilePath: /ChatGPT-Next-Web/next.config.mjs
 * @Description: This is default settings. Please set `customMade`, open koroFileHeader to check the details
 *  ref: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('next').NextConfig} */
import path from "path"

const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  async rewrites() {
    const ret = [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.openai.com/:path*",
      },
    ];

    const apiUrl = process.env.API_URL;
    if (apiUrl) {
      console.log("[Next] using api url ", apiUrl);
      ret.push({
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      });
    }

    return {
      beforeFiles: ret,
    };
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.module.rules.push({
      test: /\.png$/,
      loader: path.resolve("url-loader"),
      options: {
        limit: 10000,
        name: "static/media/[name].[hash:8].[ext]"
      }
    });

    return config;
  },
  output: "standalone",
  images: {
    loader: "imgix",
    path: ""
  }
};

export default nextConfig;
