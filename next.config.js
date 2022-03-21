// for transpiling all ESM @fullcalendar/* packages
// also, for piping fullcalendar thru babel (to learn why, see babel.config.js)
// const withTM = require('next-transpile-modules')([
//   '@babel/preset-react',
//   '@fullcalendar/common',
//   '@fullcalendar/daygrid',
//   '@fullcalendar/timegrid',
//   '@fullcalendar/react',
//   '@fullcalendar/interaction',
// ])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
// module.exports = withTM({ ...nextConfig })
