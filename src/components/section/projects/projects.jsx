import { Text } from '../../ui/custom-ui/text';
import { IconInput } from '../../ui/custom-ui/icon-input';
import { SearchNormal } from 'iconsax-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pagination } from '../../common/pagination';
import { ProjectCard } from './project-card';
import { ProjectsJson } from '../../../lib/constants/project';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [tabProjectJson, setTabProjectJson] = useState(ProjectsJson);

  const handleSetActiveCategory = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    const setActiveTabData = () => {
      if (activeCategory === 'all') {
        setTabProjectJson(ProjectsJson);
      } else {
        const filteredByCategory = ProjectsJson.filter(
          (project) => project.category.toLocaleLowerCase() === activeCategory.toLocaleLowerCase()
        );
        setTabProjectJson(filteredByCategory);
      }
    };

    setActiveTabData();
  }, [activeCategory]);

  return (
    <div className="max-w-[1540px] flex flex-col justify-center gap-4 lg:px-[6rem] xl:px-[12rem] md:px-[4rem] md:pb-[4rem] p-4 font-medium">
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
      <div className="m-auto">
        <IconInput
          icon={<SearchNormal size="20" color="black" />}
          placeHolder
          handleChange={(e) => console.log(e.target.value)}
          type={'text'}
          style="shadow drop-shadow-md bg-whitethick"
        />
      </div>
      <Tabs defaultValue="All" className="w-full">
        <div className="flex-col justify-between items-center flex md:flex-row flex-col-reverse">
          <ScrollArea className="w-full whitespace-nowrap">
            <TabsList className="justify-center items-center flex border rounded divide-x-2 w-fit m-auto h-fit bg-white my-8">
              <TabsTrigger
                value="All"
                onClick={()=>handleSetActiveCategory('all')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="ONGOING"
                onClick={()=>handleSetActiveCategory('ongoing')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                ONGOING
              </TabsTrigger>
              <TabsTrigger
                value="FUTURE"
                onClick={()=>handleSetActiveCategory('future')}
                className="px-8 py-2 rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full flex flex-col justify-center items-center"
              >
                FUTURE
              </TabsTrigger>
              <TabsTrigger
                value="COMPLETED"
                onClick={()=>handleSetActiveCategory('completed')}
                className="px-8 py-2  rounded-none data-[state=active]:bg-[ghostwhite] text-black text-center w-full"
              >
                COMPLETED
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
        <TabsContent value="All">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {tabProjectJson.map((project, index) => (
              <ProjectCard
                key={index}
                category={project.category}
                name={project.name}
                img={project.img}
                start_date={project.start_date}
                progress={project.progress}
                compensation={project.compensation}
                overview={project.overview}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="ONGOING">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {tabProjectJson.map((project, index) => (
              <ProjectCard
                key={index}
                category={project.category}
                name={project.name}
                img={project.img}
                start_date={project.start_date}
                progress={project.progress}
                compensation={project.compensation}
                overview={project.overview}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="FUTURE">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {tabProjectJson.map((project, index) => (
              <ProjectCard
                key={index}
                category={project.category}
                name={project.name}
                img={project.img}
                start_date={project.start_date}
                progress={project.progress}
                compensation={project.compensation}
                overview={project.overview}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="COMPLETED">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
            {tabProjectJson.map((project, index) => (
              <ProjectCard
                key={index}
                category={project.category}
                name={project.name}
                img={project.img}
                start_date={project.start_date}
                progress={project.progress}
                compensation={project.compensation}
                overview={project.overview}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Pagination />
    </div>
  );
};
