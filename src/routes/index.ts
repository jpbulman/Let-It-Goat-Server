import { Router } from 'express';
import 'isomorphic-fetch';
var FormData = require('form-data');

// Init router and path
const router = Router();

// Add sub-routes
router.post('/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const result = await fetch('https://bannerweb.wpi.edu/pls/prod/twbkwbis.P_ValLogin', {
    method: 'post',
    credentials: "include",
  });
  
  // take all non-empty cookies and use them for next request
  const cookies: Array<String> = [];
  result.headers.forEach((v, k) => {
    if (k === 'set-cookie') {
      const index = v.indexOf(';') + 1;
      if (index !== -1) {
        const value = v.substring(0, index);
        if (value !== '' && !value.endsWith("=;")) {
          cookies.push(value);
        }
      }
    }
  });

  const cookiesStr = cookies.join(" ") + " TESTID=set";

  const formData = new FormData();
  formData.append('sid', username);
  formData.append('PIN', password);

  const text = await (await fetch(`https://bannerweb.wpi.edu/pls/prod/twbkwbis.P_ValLogin`, {
    method: 'post',
    credentials: "include",
    body: formData,
    headers: {
      Cookie: cookiesStr,
    }
  })).text();

  const startIndex = text.indexOf('Welcome,+');

  if (startIndex === -1) {
    res.json({auth: false});
  } else {
    const endIndex = text.indexOf(',+to');
    let name = text.substring(startIndex + 9, endIndex);
    while (name.indexOf('+') !== -1) {
      name = name.replace('+', ' ');
    }
    res.json({auth: true, name});
  }

})

// Export the base-router
export default router;
