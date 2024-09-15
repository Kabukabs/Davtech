/**
 * Projects Component
 * 
 * This component displays a list of projects fetched from Firebase Firestore and allows users to filter 
 * projects based on different categories (All, Ongoing, Future, Completed). It uses a search input 
 * and tab navigation to enhance user interaction. The component also incorporates Firebase Firestore 
 * for data retrieval and state management for filtering.
 * 
 * Key Features:
 * - Fetches and displays projects from Firestore.
 * - Filters projects by category using tab navigation.
 * - Displays filtered projects dynamically based on the active category.
 * - Includes pagination (although not implemented fully in this snippet).
 */

import { useState, useEffect } from 'react';
import { Text } from '../ui/custom-ui/text'; // Custom Text component for rendering headings
import { IconInput } from '../ui/custom-ui/icon-input'; // Custom input component with an icon
import { SearchNormal } from 'iconsax-react'; // Search icon from iconsax-react package
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Tabs for filtering projects by category
import { Pagination } from '../common/pagination'; // Pagination component for handling page navigation
import { ProjectCard } from './project-card'; // Component to display individual project cards
import { ProjectsJson } from './project'; // Default projects data (could be replaced by Firestore data)
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'; // Components for scrollable areas
import { db } from '../CareerForms/firebaseConfig'; // Firebase configuration
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods to get data

export const Projects = () => {
  // State to track the active category ('all', 'ongoing', 'future', 'completed')
  const [activeCategory, setActiveCategory] = useState('all');
  
  // State to store all projects fetched from Firestore or default data
  const [projects, setProjects] = useState(ProjectsJson);
  
  // State to store projects filtered by the active category
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Fetch projects from Firestore on component mount and whenever the category changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Get projects from the 'projects' collection in Firestore
        const querySnapshot = await getDocs(collection(db, 'projects'));
        
        // Map over the documents to create an array of projects
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firestore document ID
          ...doc.data() // Spread the data from the document
        }));
        
        setProjects(fetchedProjects); // Store fetched projects in state
        setFilteredProjects(fetchedProjects); // Initially, display all projects
      } catch (error) {
        console.error("Error fetching projects:", error); // Handle errors during data fetching
      }
    };

    fetchProjects(); // Fetch projects when the component mounts
  }, [activeCategory]); // Dependencies: category state changes trigger a new fetch

  // Filter projects based on the active category
  useEffect(() => {
    filterProjects(projects, activeCategory); // Call filter function whenever category or projects change
  }, [activeCategory, projects]);

  // Function to filter projects based on selected category
  const filterProjects = (projects, category) => {
    if (category === 'all') {
      setFilteredProjects(projects); // Show all projects if category is 'all'
    } else {
      setFilteredProjects(
        projects.filter(project => (project.category?.toLowerCase() || '') === category.toLowerCase())
      ); // Filter projects based on category
    }
  };

  // Handle category change when a tab is clicked
  const handleSetActiveCategory = (category) => {
    setActiveCategory(category); // Set the clicked category as active
  };

  return (
    <div className="max-w-[1540px] flex flex-col justify-center gap-4 lg:px-[6rem] xl:px-[12rem] md:px-[4rem] md:pb-[4rem] p-4 font-medium">
      {/* Header and search input */}
      <figure className="md:w-[60%] w-full m-auto relative">
        <div className="w-full">
          <img
            src="/project_img1.svg"
            alt="object not found"
            className="w-full"
          />
        </div>
        <figcaption className="absolute m-auto left-[10%] right-[10%] md:left-[20%] md:right-[20%] bottom-[1rem]">
          <Text
            as="h1"
            style="lg:text-5xl md:text-4xl text-xl font-extrabold text-center mb-2 text-white"
          >
            PROJECTS
          </Text>
          <div className="p-2 rounded-lg text-white blur-bg">
            <Text as="h6" style="text-center text-white text-xs">
              You can now add a project for collaborators or join an existing
              project as a collaborator. Click here to add a project or view
              available projects for collaboration.
            </Text>
          </div>
        </figcaption>
      </figure>
      
      {/* Search Input */}
      <div className="m-auto">
        <IconInput
          icon={<SearchNormal size="20" color="black" />} // Search icon inside the input
          placeHolder="Search projects..." // Placeholder text
          handleChange={(e) => console.log(e.target.value)} // Log input change (replace with actual search function)
          type={'text'}
          className="shadow drop-shadow-md bg-whitethick"
        />
      </div>
      
      {/* Tabs for project categories */}
      <Tabs defaultValue="All" className="w-full">
        <div className="flex-col justify-between items-center flex md:flex-row flex-col-reverse">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="justify-center items-center flex border rounded divide-x-2 w-fit m-auto h-fit bg-white my-8">
              {/* Category Tabs */}
              <TabsTrigger
                value="All"
                onClick={() => handleSetActiveCategory('all')} // Handle tab click
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="ONGOING"
                onClick={() => handleSetActiveCategory('ongoing')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                ONGOING
              </TabsTrigger>
              <TabsTrigger
                value="FUTURE"
                onClick={() => handleSetActiveCategory('future')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                FUTURE
              </TabsTrigger>
              <TabsTrigger
                value="COMPLETED"
                onClick={() => handleSetActiveCategory('completed')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                COMPLETED
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" /> {/* Horizontal scrollbar */}
          </ScrollArea>
        </div>
        
        {/* Tabs Content */}
        <TabsContent value="All">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} /> // Display filtered projects
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ONGOING">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'ongoing').map((project) => (
              <ProjectCard key={project.id} project={project} /> // Display ongoing projects
            ))}
          </div>
        </TabsContent>
        <TabsContent value="FUTURE">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'future').map((project) => (
              <ProjectCard key={project.id} project={project} /> // Display future projects
            ))}
          </div>
        </TabsContent>
        <TabsContent value="COMPLETED">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'completed').map((project) => (
              <ProjectCard key={project.id} project={project} /> // Display completed projects
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination Component */}
      <Pagination /> {/* Pagination control (implementation not shown in this snippet) */}
    </div>
  );
};
