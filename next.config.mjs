/*
 * @Author: hiLin 123456
 * @Date: 2023-05-12 22:19:28
 * @LastEditors: hilin hilin
 * @LastEditTime: 2023-06-17 22:40:37
 * @FilePath: /ChatGPT-Next-Web/next.config.mjs
 * @Description: This is default settings. Please set `customMade`, open koroFileHeader to check the details
 *  ref: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** @type {import('next').NextConfig} */
const mode = process.env.BUILD_MODE ?? "standalone";
console.log("[Next] build mode", mode);
import path from "path"

const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    // config.module.rules.push({
    //   test: /\.png$/,
    //   loader: path.resolve("url-loader"),
    //   options: {
    //     limit: 10000,
    //     name: "static/media/[name].[hash:8].[ext]"
    //   }
    // });

    return config;
  },
  output: mode,
  images: {
    unoptimized: mode === "export",
  },
};

if (mode !== "export") {
  nextConfig.headers = async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "*",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
        ],
      },
    ];
  };

  nextConfig.rewrites = async () => {
    const ret = [
      {
        source: "/api/proxy/:path*",
        destination: "https://api.openai.com/:path*",
      },
      {
        source: "/google-fonts/:path*",
        destination: "https://fonts.googleapis.com/:path*",
      },
      {
        source: "/sharegpt",
        destination: "https://sharegpt.com/api/conversations",
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
  };
}

export default nextConfig;
