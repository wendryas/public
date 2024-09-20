import { ConfigProvider } from "antd";
import { Router } from "./routes/Routes";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          cssVar: true,
          components: {
            Button: {
              colorPrimary: "black",
              colorPrimaryHover: "#bfbfbf",
              colorPrimaryActive: "#bfbfbf",
              colorSuccess: "#1890ff",
              lineWidth: 0,
            },
          },
          token: {
            colorPrimary: "#1890FF",
            colorLink: "#408CFF",
            borderRadius: 2,
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </>
  );
}

export default App;
