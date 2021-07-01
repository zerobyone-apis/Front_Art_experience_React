import { useEffect } from 'react';

export const Chat = () => {

  useEffect(() => {
      // Include the Crisp code here, without the <script></script> tags
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = "59439b21-06ff-4ccc-ad28-e8414c643a74";
  
      (function() {
        var d = document;
        var s = d.createElement("script");
  
        s.src = "https://client.crisp.chat/l.js";
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      })();
  },[])

return (
  null
)

}

