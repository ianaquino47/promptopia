import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadate = {
  title: "Promptopia",
  description: "Discover and Share AI Prompts.",
};
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
};

export default RootLayout;
