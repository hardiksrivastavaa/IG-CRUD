# Instagram-like CRUD Application

## Description

This is a simple CRUD (Create, Read, Update, Delete) application that mimics basic functionalities similar to those found on Instagram. Built with Node.js, Express, and EJS templating, the application allows users to create, view, edit, and delete posts. The application features modern styling with responsive design, ensuring a seamless experience on both desktop and mobile devices.

## Features

- **Create**: Add new posts with a username and content.
- **Read**: View a list of all posts and details of individual posts.
- **Update**: Edit existing posts.
- **Delete**: Remove posts from the list.
- **Responsive Design**: Fully mobile and tablet-friendly interface with modern aesthetics.
- **Interactive Buttons**: Intuitive icons for viewing, editing, and deleting posts.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js.
- **EJS**: Embedded JavaScript templating engine for rendering views.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Font Awesome**: Icon library for interactive buttons.
- **UUID**: Unique identifier generation for posts.

## Live Demo

You can view the live application here: [Instagram-like CRUD Application](https://igcrud.vercel.app/posts)

## Usage

- **Home Page**: Redirects to `/posts`, displaying a list of all posts.
- **Create New Post**: Click on the floating "Create New Post" button to navigate to the form for adding a new post.
- **View Post**: Click on the eye icon to view the details of a post.
- **Edit Post**: Click on the pencil icon to edit an existing post.
- **Delete Post**: Click on the trash icon to delete a post.

## File Structure

- `app.js`: Main application file where routes and logic are defined.
- `views/`: Contains EJS templates:
  - `index.ejs`: Displays all posts with modern responsive design.
  - `new.ejs`: Form for creating a new post.
  - `show.ejs`: Displays details of a single post.
  - `edit.ejs`: Form for editing an existing post.
- `public/`: Contains static files such as CSS.
- `style.css`: Custom styles for the application, enhanced with Tailwind CSS for responsiveness.

## Contributing

Feel free to fork the repository, create a branch, and submit a pull request. Contributions are welcome!

## Contact

For any questions or issues, please contact [hardikfgp@gmail.com](mailto:hardikfgp@gmail.com).

---

*Happy coding!*
