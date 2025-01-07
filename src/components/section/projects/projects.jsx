/*
  The `Projects` component displays a list of projects fetched from Firebase, allowing users to filter projects by category using tabs. It includes:
  - A search input for filtering projects by name or description
  - Tabs for selecting different project categories (All, Ongoing, Future, Completed)
  - Display of project cards based on the selected category
  - Pagination for navigating through multiple pages of projects

  The component uses Firebase Firestore to fetch projects and handles filtering based on selected categories.
*/

import { useState, useEffect } from 'react';
import { Text } from '../../ui/custom-ui/text'; // Custom text component
import { IconInput } from '../../ui/custom-ui/icon-input'; // Custom input component with icon
import { SearchNormal } from 'iconsax-react'; // Search icon component
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Tab components
import { Pagination } from '../../common/pagination'; // Pagination component
import { ProjectCard } from './project-card'; // Component to display individual project cards
import { ProjectsJson } from './project'; // Static project data (fallback)
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'; // Custom scroll area components
import { db } from '../../CareerForms/firebaseConfig'; // Firebase Firestore configuration
import { collection, getDocs } from 'firebase/firestore'; // Firebase Firestore methods

export const Projects = () => {
  // State to manage the active category and the list of projects
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState(ProjectsJson); // Default to static data initially
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Fetch projects from Firebase Firestore when the component mounts or category changes
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const fetchedProjects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(fetchedProjects);
        setFilteredProjects(fetchedProjects); // Initially show all projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [activeCategory]);

  // Filter projects based on the active category
  useEffect(() => {
    filterProjects(projects, activeCategory);
  }, [activeCategory, projects]);

  const filterProjects = (projects, category) => {
    if (category === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(
        project => (project.category?.toLowerCase() || '') === category.toLowerCase()
      ));
    }
  };

  const handleSetActiveCategory = (category) => {
    setActiveCategory(category);
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
          icon={<SearchNormal size="20" color="black" />}
          placeHolder
          handleChange={(e) => console.log(e.target.value)} // Placeholder for search functionality
          type={'text'}
          className="shadow drop-shadow-md bg-whitethick"
        />
      </div>
      
      {/* Tabs for project categories */}
      <Tabs defaultValue="All" className="w-full">
        <div className="flex-col justify-between items-center flex md:flex-row flex-col-reverse">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="justify-center items-center flex border rounded divide-x-2 w-fit m-auto h-fit bg-white my-8">
              <TabsTrigger
                value="All"
                onClick={() => handleSetActiveCategory('all')}
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
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full flex flex-col justify-center items-center"
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        
        {/* Tabs Content */}
        <TabsContent value="All">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ONGOING">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'ongoing').map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="FUTURE">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'future').map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="COMPLETED">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {filteredProjects.filter(project => project.category?.toLowerCase() === 'completed').map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Pagination />
    </div>
  );
};
