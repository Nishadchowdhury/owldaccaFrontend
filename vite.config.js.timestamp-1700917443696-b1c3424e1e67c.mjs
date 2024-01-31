// vite.config.js
import { defineConfig } from "file:///Q:/Professional%20Projects/react-restuarent-shuvo/node_modules/vite/dist/node/index.js";
import react from "file:///Q:/Professional%20Projects/react-restuarent-shuvo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///Q:/Professional%20Projects/react-restuarent-shuvo/node_modules/vite-plugin-pwa/dist/index.js";
var manifestForPlugIn = {
  registerType: "prompt",
  includeAssests: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Owl Dacca",
    short_name: "Owl Dacca",
    description: "Have some good foods.",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "/maskable_icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#171717",
    background_color: "#040D21",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJROlxcXFxQcm9mZXNzaW9uYWwgUHJvamVjdHNcXFxccmVhY3QtcmVzdHVhcmVudC1zaHV2b1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiUTpcXFxcUHJvZmVzc2lvbmFsIFByb2plY3RzXFxcXHJlYWN0LXJlc3R1YXJlbnQtc2h1dm9cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1E6L1Byb2Zlc3Npb25hbCUyMFByb2plY3RzL3JlYWN0LXJlc3R1YXJlbnQtc2h1dm8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1wd2FcIjtcblxuLy8geW91IGNhbiBjb3B5IHRoZSBiYXNlIHN0cnVjdHVyZSBvZiBtYW5pZmVzdCBvYmplY3QuXG5jb25zdCBtYW5pZmVzdEZvclBsdWdJbiA9IHtcbiAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcbiAgaW5jbHVkZUFzc2VzdHM6IFsnZmF2aWNvbi5pY28nLCBcImFwcGxlLXRvdWMtaWNvbi5wbmdcIiwgXCJtYXNrZWQtaWNvbi5zdmdcIl0sXG4gIG1hbmlmZXN0OiB7XG4gICAgbmFtZTogXCJPd2wgRGFjY2FcIixcbiAgICBzaG9ydF9uYW1lOiBcIk93bCBEYWNjYVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkhhdmUgc29tZSBnb29kIGZvb2RzLlwiLFxuICAgIGljb25zOiBbe1xuICAgICAgc3JjOiAnL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyxcbiAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgIHB1cnBvc2U6ICdmYXZpY29uJ1xuICAgIH0sXG4gICAge1xuICAgICAgc3JjOiAnL2FuZHJvaWQtY2hyb21lLTUxMng1MTIucG5nJyxcbiAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgIHB1cnBvc2U6ICdmYXZpY29uJ1xuICAgIH0sXG4gICAge1xuICAgICAgc3JjOiAnL2FwcGxlLXRvdWNoLWljb24ucG5nJyxcbiAgICAgIHNpemVzOiAnMTgweDE4MCcsXG4gICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgIHB1cnBvc2U6ICdhcHBsZSB0b3VjaCBpY29uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHNyYzogJy9tYXNrYWJsZV9pY29uLnBuZycsXG4gICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcbiAgICB9XG4gICAgXSxcbiAgICB0aGVtZV9jb2xvcjogJyMxNzE3MTcnLFxuICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDQwRDIxJyxcbiAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICBzY29wZTogJy8nLFxuICAgIHN0YXJ0X3VybDogXCIvXCIsXG4gICAgb3JpZW50YXRpb246ICdwb3J0cmFpdCdcbiAgfVxufVxuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQShtYW5pZmVzdEZvclBsdWdJbildLFxufSlcblxuXG5cbi8vIGltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG4vLyBpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbi8vIC8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG4vLyBleHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuLy8gICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4vLyB9KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VSxTQUFTLG9CQUFvQjtBQUNwVyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLElBQU0sb0JBQW9CO0FBQUEsRUFDeEIsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCLENBQUMsZUFBZSx1QkFBdUIsaUJBQWlCO0FBQUEsRUFDeEUsVUFBVTtBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLE1BQUM7QUFBQSxRQUNOLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxLQUFLO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLEtBQUs7QUFBQSxRQUNMLE9BQU87QUFBQSxRQUNQLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2Isa0JBQWtCO0FBQUEsSUFDbEIsU0FBUztBQUFBLElBQ1QsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2Y7QUFDRjtBQUlBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUSxpQkFBaUIsQ0FBQztBQUMvQyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
