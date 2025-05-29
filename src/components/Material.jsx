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
        <Subtitle>Access comprehensive reading materials for your branch</Subtitle>
      </Header>

      <BranchSelector>
        <Select value={selectedBranch} onChange={handleBranchChange}>
          <option value="">Select your branch</option>
          <option value="computer-science">Computer Science</option>
          <option value="electronics">Electronics</option>
          <option value="mechanical">Mechanical</option>
        </Select>
      </BranchSelector>

      {selectedBranch ? (
        <MaterialsGrid>
          {materials[selectedBranch]?.map((material, index) => (
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
      ) : (
        <NoMaterials>
          Please select your branch to view available materials
        </NoMaterials>
      )}
    </Container>
  );
};

export default Material; 