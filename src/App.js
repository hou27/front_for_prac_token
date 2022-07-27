import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Auth from "./layouts/Auth";

// views without layouts

import Index from "./views/main";

// FlareLane initialization

import FlareLane from "@flarelane/flarelane-web-sdk";

{
  /* <script src="https://cdn.flarelane.com/WebSDK.js"></script>
<script>
    FlareLane.initialize({ projectId: "89dc0207-15e7-49fd-8824-61c7cdde0f47" });
</script> */
}

FlareLane.initialize({
  projectId: "89dc0207-15e7-49fd-8824-61c7cdde0f47",
  // 사용중인 별도 이름의 ServiceWorker가 있는 경우 해당 경로
  serviceWorkerPath: "/sw.js",
});

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/auth" component={Auth} />
        {/* add routes without layouts */}
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
