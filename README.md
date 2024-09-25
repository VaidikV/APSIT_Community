## Welcome to APSIT Community!!

[Live Link](https://apsit-community.vercel.app/)

APSIT Community is a social media platform developed to enhance interdepartmental communication among students at the A. P. Shah Institute of Technology (APSIT). The platform enables students to post updates, engage with content, share internship opportunities, and foster collaborative interactions within the institution.

## Features

- **Post Creation**: Users can create, edit, and delete posts, allowing for dynamic content sharing.
- **Content Moderation**: Automated obscene content detection ensures a positive environment.
- **Internship Scraper**: Fetches and displays internship opportunities from various sources.
- **User Engagement**: Students can interact with posts by liking, commenting, and reporting content.
- **Scalable Backend**: The backend is hosted on AWS Elastic Beanstalk for reliability and scalability.
.
## Tech Stack

- **Frontend**: 
  - Next.js
  - Material UI

- **Backend**:
  - Flask (Python)
  - RESTful APIs
  - Backend repository is [here](https://github.com/VaidikV/APSIT-Community-Backend)

- **Hosting**:
  - AWS Elastic Beanstalk (Backend)

## Pictures

![home page](https://github.com/user-attachments/assets/46dd63a4-2227-479f-914f-d7a3896df993) </br>
Home Page </br>
![internships](https://github.com/user-attachments/assets/63e057c1-2b1d-40ec-b6c6-188ddaee336c) </br>
Internships Scraper is built in the web app </br>
![Calendar](https://github.com/user-attachments/assets/9edac9cb-6577-4fc2-aa19-85a7104496cf) </br>
Calendar which can be customized by the students. </br>

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VaidikV/APSIT_Community.git

#### In order to run this app on your local machine please follow below written steps:

1. Clone this repo in your local machine or download zip file and extract.
2. By default app is connected by remote server. In order to test it with local server 
   - Go to root folder
   - Open *next.config.js* file
   - Replace *HOST_API_KEY* with your local server address.
3. Instructions

     1. Before proceeding you'll need to have the latest stable nodejs.
        Recommended environment:

        - node js 16.x (Recommend v16.15.10)
        - npm 6+
        - Do not delete the package-lock.json / yarn.lock file in the project.
        
     2. Install & Start
        1. Using Yarn (Recommend)
           > yarn install
           >
           > yarn dev

        2. Using Npm
           > npm i
           > 
           > npm run dev

        3. Build
           > yarn build
           >
           > npm run build






