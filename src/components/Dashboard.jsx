import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 80vh;
  animation: ${fadeIn} 0.8s ease-out;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatIcon = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  animation: ${float} 3s ease-in-out infinite;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatInfo = styled.div`
  text-align: left;
`;

const StatValue = styled.h3`
  font-size: 3rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const StatLabel = styled.p`
  color: #64748b;
  font-size: 1.2rem;
`;

const ProjectInfo = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h2`
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectDescription = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e293b;
  font-size: 1rem;
  padding: 0.5rem;
  background: #f8fafc;
  border-radius: 8px;

  &::before {
    content: '✓';
    color: #3b82f6;
    font-weight: bold;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const DashboardCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FlowChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FlowStep = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 2rem;
    width: 2px;
    height: 1rem;
    background: #e2e8f0;
    ${props => props.last && 'display: none;'}
  }
`;

const StepNumber = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h4`
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const StepDescription = styled.p`
  color: #64748b;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

const Progress = styled.div`
  width: ${props => props.value}%;
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const Metric = styled.div`
  text-align: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
`;

const MetricValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1e293b;
  margin-bottom: 0.25rem;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #64748b;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <StatsRow>
        <StatIcon>📚</StatIcon>
        <StatInfo>
          <StatValue>3</StatValue>
          <StatLabel>Active Courses</StatLabel>
        </StatInfo>
      </StatsRow>

      <ProjectInfo>
        <ProjectTitle>
          <span role="img" aria-label="rocket">🚀</span>
          Intel Project Overview
        </ProjectTitle>
        <ProjectDescription>
          Welcome to the Intel Project - A comprehensive learning platform designed to help students excel in their academic journey. Our platform offers a wide range of courses, tests, and learning materials across various branches of engineering.
        </ProjectDescription>
        <FeatureList>
          <FeatureItem>Interactive Learning Modules</FeatureItem>
          <FeatureItem>Branch-specific Course Content</FeatureItem>
          <FeatureItem>Real-time Progress Tracking</FeatureItem>
          <FeatureItem>Comprehensive Test System</FeatureItem>
          <FeatureItem>Study Material Library</FeatureItem>
          <FeatureItem>Performance Analytics</FeatureItem>
        </FeatureList>
      </ProjectInfo>

      <DashboardGrid>
        <DashboardCard>
          <CardTitle>
            <span role="img" aria-label="chart">📊</span>
            Learning Flow
          </CardTitle>
          <FlowChart>
            <FlowStep>
              <StepNumber>1</StepNumber>
              <StepContent>
                <StepTitle>Course Selection</StepTitle>
                <StepDescription>Choose from various engineering branches</StepDescription>
              </StepContent>
            </FlowStep>
            <FlowStep>
              <StepNumber>2</StepNumber>
              <StepContent>
                <StepTitle>Study Materials</StepTitle>
                <StepDescription>Access comprehensive learning resources</StepDescription>
              </StepContent>
            </FlowStep>
            <FlowStep>
              <StepNumber>3</StepNumber>
              <StepContent>
                <StepTitle>Practice Tests</StepTitle>
                <StepDescription>Evaluate your understanding</StepDescription>
              </StepContent>
            </FlowStep>
            <FlowStep last>
              <StepNumber>4</StepNumber>
              <StepContent>
                <StepTitle>Performance Analysis</StepTitle>
                <StepDescription>Track your progress and improvements</StepDescription>
              </StepContent>
            </FlowStep>
          </FlowChart>
        </DashboardCard>

        <DashboardCard>
          <CardTitle>
            <span role="img" aria-label="target">🎯</span>
            Progress Overview
          </CardTitle>
          <ProgressBar>
            <Progress value={75} />
          </ProgressBar>
          <MetricGrid>
            <Metric>
              <MetricValue>85%</MetricValue>
              <MetricLabel>Average Score</MetricLabel>
            </Metric>
            <Metric>
              <MetricValue>12h</MetricValue>
              <MetricLabel>Study Time</MetricLabel>
            </Metric>
            <Metric>
              <MetricValue>24</MetricValue>
              <MetricLabel>Tests Completed</MetricLabel>
            </Metric>
            <Metric>
              <MetricValue>3</MetricValue>
              <MetricLabel>Active Courses</MetricLabel>
            </Metric>
          </MetricGrid>
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;