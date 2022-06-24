/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    MONGO_URI:"mongodb+srv://admin:admin1234@my-money.mlsglet.mongodb.net/?retryWrites=true&w=majority"
  }
}

module.exports = nextConfig
