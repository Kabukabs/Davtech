/*
 * The ProjectsJson constant exports project roadmap information, including the different stages of a project.
 * Each stage is represented by an image and a title.
 * This data is used to display the project's development roadmap in various components.
 */

import idea from '/WhatsApp Image 2024-07-04 at 6.07.07 AM (1) 1.svg'; // Image for the IDEA stage
import design from '/WhatsApp Image 2024-07-04 at 6.07.07 AM (2) 2.svg'; // Image for the DESIGN stage
import development from '/WhatsApp Image 2024-07-04 at 6.07.07 AM 1.svg'; // Image for the DEVELOPMENT stage
import testing from '/WhatsApp Image 2024-07-04 at 6.07.09 AM 1.svg'; // Image for the TESTING stage
import deployment from '/12376840_4884792 1.svg'; // Image for the DEPLOYMENT stage

// Exporting a constant that holds the project roadmap information
export const ProjectsJson = [
  {
    overview: {
      developement_roadmap: [
        { img: idea, title: 'IDEA' },          // Initial project idea stage
        { img: design, title: 'DESIGN' },      // Design stage of the project
        { img: development, title: 'DEVELOPEMENT' }, // Development stage of the project
        { img: testing, title: 'TESTING' },    // Testing stage of the project
        { img: deployment, title: 'DEPLOYMENT' }  // Deployment stage of the project
      ],
    },
  },
];
