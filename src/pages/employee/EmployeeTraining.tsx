import React from 'react';
import { useAtom } from 'jotai';
import { courseEnrollmentsAtom, trainingCertificatesAtom } from '../../lib/training';
import TrainingProgress from '../../components/training/TrainingProgress';
import TrainingCertificateList from '../../components/training/TrainingCertificateList';
import TrainingNotifications from '../../components/training/TrainingNotifications';

interface EmployeeTrainingProps {
  employeeId: string;
}

export default function EmployeeTraining({ employeeId }: EmployeeTrainingProps) {
  const [enrollments] = useAtom(courseEnrollmentsAtom);
  const [certificates] = useAtom(trainingCertificatesAtom);

  const employeeEnrollments = enrollments.filter(e => e.userId === employeeId);
  const employeeCertificates = certificates.filter(c => c.userId === employeeId);

  return (
    <div className="space-y-6">
      <TrainingNotifications 
        certificates={employeeCertificates}
        upcomingTraining={employeeEnrollments
          .filter(e => e.status === 'ENROLLED')
          .map(e => ({
            courseId: e.courseId,
            startDate: e.startDate,
            type: 'Course',
          }))}
      />
      <TrainingProgress enrollments={employeeEnrollments} />
      <TrainingCertificateList certificates={employeeCertificates} />
    </div>
  );
}