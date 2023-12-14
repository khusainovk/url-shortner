import React from "react";
import { Container } from "@mui/material";
import { ShortUrlForm, ShortUrlList, Notifications } from "./features";

function App() {
  return (
    <Container maxWidth="sm">
      <ShortUrlForm />
      <ShortUrlList />
      <Notifications />
    </Container>
  );
}

export default App;
