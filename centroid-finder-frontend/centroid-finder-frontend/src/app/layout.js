import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Box, Button, ButtonGroup, BottomNavigation, IconButton, Paper, Toolbar, Typography, Grid, Container} from '@mui/material';
import ThemeRegistry from "./ThemeRegistry";
import { SettingsProvider } from "@/context/SettingsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Salamander Spotter",
  description: "Track and preview salamander movement from videos",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* HEADER */}
        <ThemeRegistry>
          <Box sx={{ flexGrow: 1, marginBottom: 2}}>
            
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Image src="/icon-white.ico" width="50" height="50" alt="logo"></Image>
                  
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link href="/">Salamander Spotter</Link>
                  </Typography>
                  
                  <Button variant="text" color="string" href="/about">About</Button>
                </Toolbar>
              </Container>
              
            </AppBar>
          </Box>

        {/* MAIN CONTENT */}
        {/* Wrap all content in SettingsProvider context */}
        <SettingsProvider>
          {children}
        </SettingsProvider>

        {/* FOOTER */}
          {/* <footer style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem 0",
            backgroundColor: "#fff", // optional: give contrast if needed
          }}> */}
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 1}} elevation={3}>

              <Typography align='center' variant="body2" component="p">ART Salamander Solutions &#169; 2025</Typography>
              <div id="created-by" style={{ textAlign: "center" }}>
                
                <Typography variant="body2" component="p" color="secondary"  ><i>This project was created by Green River College students of the Cohort 20 Software Development BAS program.</i></Typography>
                <ul id="student-linkedin" style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {/* link your LinkedIn Portfolios inside of the hrefs*/}
                  <Button href="https://www.linkedin.com/in/augy-markham/" target="_blank">Augy Markham</Button>
                  <Button href="https://www.linkedin.com/in/rebecca-riffle/" target="_blank">Rebecca Riffle</Button>
                  <Button href="https://www.linkedin.com/in/dev-tylergilmore/" target="_blank" > Tyler Gilmore</Button>
                </ul>
              </div>
          </Paper>
          {/* </footer> */}
        </ThemeRegistry>
      </body>
    </html>
  );
}
