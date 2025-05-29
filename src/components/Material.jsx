import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #1e293b;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
`;

const BranchSelector = styled.div`
  max-width: 400px;
  margin: 0 auto 3rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  color: #1e293b;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const MaterialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const MaterialCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const MaterialTitle = styled.h3`
  color: #1e293b;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
`;

const MaterialContent = styled.div`
  color: #334155;
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h4`
  color: #1e293b;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #475569;
`;

const NoMaterials = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
  font-size: 1.1rem;
`;

const YouTubeLinks = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
`;

const VideoCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #3b82f6;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #e2e8f0;
  overflow: hidden;
  border-bottom: 1px solid #e2e8f0;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 56px;
  height: 56px;
  background: rgba(59, 130, 246, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  ${VideoCard}:hover & {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const VideoInfo = styled.div`
  padding: 1.25rem;
  background: white;
`;

const VideoTitle = styled.h5`
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 1rem;
  line-height: 1.4;
  font-weight: 600;
`;

const VideoDuration = styled.span`
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:before {
    content: '▶';
    font-size: 0.75em;
  }
`;

const VideoResourcesCard = styled(MaterialCard)`
  grid-column: 1 / -1;
  margin-top: 2rem;
  background: linear-gradient(to bottom, #ffffff, #f8fafc);
`;

const VideoSectionTitle = styled(SectionTitle)`
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(to right, #3b82f6, #60a5fa);
    border-radius: 2px;
  }
`;

const TopicSection = styled.div`
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const TopicHeader = styled.h3`
  color: #1e293b;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '📚';
    font-size: 1.2em;
  }
`;

const Material = () => {
  const [selectedBranch, setSelectedBranch] = useState('');

  // Sample materials data with actual content
  const materials = {
    'computer-science': [
      {
        title: 'Operating Systems',
        content: {
          overview: 'Operating systems are the core software that manages computer hardware and software resources, providing common services for computer programs. They are essential for running applications and managing system resources efficiently.',
          keyConcepts: [
            'Process Management and Scheduling',
            'Memory Management and Virtual Memory',
            'File Systems and I/O Management',
            'Inter-Process Communication',
            'Deadlock Prevention and Recovery'
          ],
          applications: [
            'Windows, Linux, and macOS',
            'Mobile Operating Systems (Android, iOS)',
            'Real-time Operating Systems',
            'Embedded Systems',
            'Server Operating Systems'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=26QPDBe-NB8', // Operating System Basics
            'https://www.youtube.com/watch?v=9GDX-IyZ_C8', // Process Management
            'https://www.youtube.com/watch?v=2quKyPnUShQ'  // Memory Management
          ]
        }
      },
      {
        title: 'Computer Networks',
        content: {
          overview: 'Computer networks enable communication between devices and systems, allowing data exchange and resource sharing. Understanding network protocols, architecture, and security is crucial for modern computing.',
          keyConcepts: [
            'OSI and TCP/IP Models',
            'Network Protocols (HTTP, FTP, SMTP)',
            'IP Addressing and Subnetting',
            'Routing and Switching',
            'Network Security and Cryptography'
          ],
          applications: [
            'Internet and Web Services',
            'Cloud Computing',
            'Wireless Networks',
            'Network Security',
            'Distributed Systems'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=3QhU9jd03a0', // Computer Networks Basics
            'https://www.youtube.com/watch?v=vv4y_uOneC0', // OSI Model
            'https://www.youtube.com/watch?v=qiQR5rTSshw'  // TCP/IP Protocol
          ]
        }
      },
      {
        title: 'Data Structures and Algorithms',
        content: {
          overview: 'Data structures and algorithms form the foundation of efficient programming. They help in organizing and manipulating data effectively, solving complex problems, and optimizing program performance.',
          keyConcepts: [
            'Arrays, Linked Lists, and Trees',
            'Sorting and Searching Algorithms',
            'Graph Algorithms',
            'Dynamic Programming',
            'Time and Space Complexity Analysis'
          ],
          applications: [
            'Database Systems',
            'Artificial Intelligence',
            'Game Development',
            'Web Development',
            'System Design'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=RBSGKlAvoiM', // Data Structures
            'https://www.youtube.com/watch?v=8hly31xKli0', // Algorithms
            'https://www.youtube.com/watch?v=09_LlHjoEiY'  // Big O Notation
          ]
        }
      },
      {
        title: 'Frontend Development',
        content: {
          overview: 'Frontend development focuses on creating user interfaces and experiences. It involves building responsive, interactive, and accessible web applications using modern technologies and frameworks.',
          keyConcepts: [
            'HTML5 and CSS3',
            'JavaScript and ES6+',
            'React.js and Component Architecture',
            'State Management (Redux, Context API)',
            'Responsive Design and CSS Frameworks'
          ],
          bestPractices: [
            'Component-Based Architecture',
            'Performance Optimization',
            'Accessibility Standards',
            'Cross-Browser Compatibility',
            'Code Organization and Maintainability'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=1Rs2ND1luYQ', // HTML/CSS
            'https://www.youtube.com/watch?v=PkZNo7MFNFg', // JavaScript
            'https://www.youtube.com/watch?v=w7ejDZ8SWv8'  // React
          ]
        }
      },
      {
        title: 'Backend Development',
        content: {
          overview: 'Backend development involves creating server-side applications, APIs, and databases that power web applications. It focuses on business logic, data management, and system integration.',
          keyConcepts: [
            'Node.js and Express.js',
            'RESTful API Design',
            'Authentication and Authorization',
            'Server-Side Rendering',
            'Microservices Architecture'
          ],
          applications: [
            'Web Applications',
            'Mobile App Backends',
            'Cloud Services',
            'Enterprise Systems',
            'IoT Applications'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=Oe421EPjeBE', // Node.js
            'https://www.youtube.com/watch?v=7YcW25PHnAA', // Express.js
            'https://www.youtube.com/watch?v=lsMQRaeKNDk'  // REST APIs
          ]
        }
      },
      {
        title: 'Database Systems',
        content: {
          overview: 'Database systems are essential for storing, managing, and retrieving data efficiently. Modern applications require understanding both SQL and NoSQL databases for different use cases.',
          keyConcepts: [
            'SQL Databases (MySQL, PostgreSQL)',
            'NoSQL Databases (MongoDB, Redis)',
            'Database Design and Normalization',
            'Query Optimization',
            'Data Modeling and Relationships'
          ],
          applications: [
            'Web Applications',
            'Data Analytics',
            'Real-time Applications',
            'Content Management Systems',
            'E-commerce Platforms'
          ],
          youtubeUrls: [
            'https://www.youtube.com/watch?v=HXV3zeQKqGY', // SQL
            'https://www.youtube.com/watch?v=Www6cTUyCYQ', // MongoDB
            'https://www.youtube.com/watch?v=4cWkVbC2bNE'  // Database Design
          ]
        }
      }
    ],
    'electronics': [
      {
        title: 'Digital Electronics',
        content: {
          overview: 'Digital electronics deals with electronic systems that use digital signals. It forms the foundation of modern computing and communication systems.',
          keyConcepts: [
            'Binary Number System',
            'Logic Gates',
            'Boolean Algebra',
            'Combinational Circuits',
            'Sequential Circuits'
          ],
          applications: [
            'Microprocessors',
            'Memory Systems',
            'Digital Signal Processing',
            'Communication Systems',
            'Control Systems'
          ]
        }
      }
    ],
    'mechanical': [
      {
        title: 'Thermodynamics',
        content: {
          overview: 'Thermodynamics is the study of heat, energy, and work in physical systems. It is fundamental to understanding energy conversion and heat transfer processes.',
          keyConcepts: [
            'Laws of Thermodynamics',
            'Heat Transfer',
            'Energy Conversion',
            'Entropy',
            'Thermodynamic Cycles'
          ],
          applications: [
            'Power Plants',
            'Refrigeration Systems',
            'Internal Combustion Engines',
            'Heat Exchangers',
            'Air Conditioning Systems'
          ]
        }
      }
    ]
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  return (
    <Container>
      <Header>
        <Title>Study Materials</Title>
        <Subtitle>Access comprehensive learning resources for your branch</Subtitle>
      </Header>

      <BranchSelector>
        <Select value={selectedBranch} onChange={handleBranchChange}>
          <option value="">Select Branch</option>
          <option value="computer-science">Computer Science</option>
          <option value="electronics">Electronics</option>
          <option value="mechanical">Mechanical</option>
        </Select>
      </BranchSelector>

      {selectedBranch ? (
        <>
          <MaterialsGrid>
            {materials[selectedBranch].map((material, index) => (
              <MaterialCard key={index}>
                <MaterialTitle>{material.title}</MaterialTitle>
                <MaterialContent>
                  <Section>
                    <SectionTitle>Overview</SectionTitle>
                    <p>{material.content.overview}</p>
                  </Section>
                  
                  <Section>
                    <SectionTitle>Key Concepts</SectionTitle>
                    <List>
                      {material.content.keyConcepts.map((concept, idx) => (
                        <ListItem key={idx}>{concept}</ListItem>
                      ))}
                    </List>
                  </Section>

                  {material.content.applications && (
                    <Section>
                      <SectionTitle>Applications</SectionTitle>
                      <List>
                        {material.content.applications.map((app, idx) => (
                          <ListItem key={idx}>{app}</ListItem>
                        ))}
                      </List>
                    </Section>
                  )}

                  {material.content.bestPractices && (
                    <Section>
                      <SectionTitle>Best Practices</SectionTitle>
                      <List>
                        {material.content.bestPractices.map((practice, idx) => (
                          <ListItem key={idx}>{practice}</ListItem>
                        ))}
                      </List>
                    </Section>
                  )}
                </MaterialContent>
              </MaterialCard>
            ))}
          </MaterialsGrid>

          {/* Only show Video Resources for Computer Science branch */}
          {selectedBranch === 'computer-science' && (
            <VideoResourcesCard>
              <VideoSectionTitle>Video Resources</VideoSectionTitle>
              {materials[selectedBranch].map((material, materialIndex) => (
                <TopicSection key={materialIndex}>
                  <TopicHeader>{material.title}</TopicHeader>
                  <VideoGrid>
                    {material.content.youtubeUrls?.map((url, videoIndex) => {
                      const videoId = url.split('v=')[1];
                      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                      return (
                        <VideoCard key={`${materialIndex}-${videoIndex}`}>
                          <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <ThumbnailContainer>
                              <Thumbnail 
                                src={thumbnailUrl} 
                                alt={`${material.title} - Video ${videoIndex + 1}`}
                                onError={(e) => {
                                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                }}
                              />
                              <PlayButton>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 5v14l11-7z" fill="currentColor"/>
                                </svg>
                              </PlayButton>
                            </ThumbnailContainer>
                            <VideoInfo>
                              <VideoTitle>
                                {material.title} - Part {videoIndex + 1}
                              </VideoTitle>
                              <VideoDuration>Click to watch</VideoDuration>
                            </VideoInfo>
                          </a>
                        </VideoCard>
                      );
                    })}
                  </VideoGrid>
                </TopicSection>
              ))}
            </VideoResourcesCard>
          )}
        </>
      ) : (
        <NoMaterials>
          Please select a branch to view study materials
        </NoMaterials>
      )}
    </Container>
  );
};

export default Material; 