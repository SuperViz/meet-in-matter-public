# Meet-in-Matter -  Meetings Inside Matterport Tours Demo

https://meetinmatter.com is an open-source demo created by SuperViz that showcases the potential of integrating **[SuperViz](https://superviz.com/)**'s collaboration and communication tools into Matterport tours. With Meet-in-Matter, you can conduct free 60-minute meetings directly inside your Matterport tours, enhancing collaboration and communication in immersive 3D environments.

## **Requirements**

Before getting started with the demo, make sure you have the following:

1. Matterport SDK Key: You need a valid Matterport SDK key to interact with Matterport tours programmatically.

## **Getting Started**

To use Meet-in-Matter, follow these basic steps:

1. Create a free account on **[SuperViz](https://superviz.com/)**: Sign up for a SuperViz account to access the developer token required for integrating the solution.
2. Copy the Developer Token: Once you have a SuperViz account, navigate to the developer settings or dashboard to find and copy the developer token.
3. Clone the Repository: Clone the repository to your local machine.
4. Configure Environment Variables: Open the **`env-sample.js`** file in the cloned repository and add your Matterport SDK key and SuperViz Developer token. Rename to **`env.js`** and save.

```jsx
// env.js
export const DEVELOPER_KEY = '';
export const MATTERPORT_KEY = '';
```

## **Usage**

Once you have set up the required environment variables, you can run the Meet-in-Matter demo. Simply host the files on a web server or use a local development environment.

1. Host on a Web Server: Upload the files to your web server and access the Meet-in-Matter demo through the server's URL.
2. Local Development: If you prefer to run the demo locally, use a development server and open the demo in your web browser.

## **Features**

Meet-in-Matter allows you to enjoy the following features:

- Conduct meetings inside Matterport tours.
- Interact with participants in real-time while exploring 3D environments.
- Collaborate and communicate effectively within the context of the Matterport tours.
- Experience low-latency and high-quality video conferencing.
- Seamlessly integrate with SuperViz's collaboration tools.

## **Contributing**

We welcome contributions from the community to improve and extend the Meet-in-Matter demo. If you find any bugs, have feature suggestions, or want to contribute in any way, please feel free to create issues or submit pull requests on the **[GitHub repository](https://github.com/superviz/meet-in-matter)**.

## **License**

Meet-in-Matter is open-source software licensed under the **[MIT License](https://chat.openai.com/link-to-license-file)**. You are free to use, modify, and distribute this software following the terms of the MIT License.

---

Thank you for your interest in Meet-in-Matter! We hope you enjoy using the demo and explore the possibilities of enhanced collaboration and communication in Matterport tours with SuperViz's developer tools. If you have any questions or need assistance, please don't hesitate to contact us at [contact@superviz.com](mailto:support@superviz.com). 

Happy coding!
