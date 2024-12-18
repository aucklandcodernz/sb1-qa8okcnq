import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Plus } from 'lucide-react';
import { performanceGoalsAtom } from '../../lib/performance';
import { userAtom } from '../../lib/auth';
import GoalsList from '../../components/performance/GoalsList';
import CreateGoalForm from '../../components/performance/CreateGoalForm';

export default function GoalsDevelopment() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user] = useAtom(userAtom);
  const [goals] = useAtom(performanceGoalsAtom);

  const userGoals = goals.filter(goal => goal.employeeId === user?.id);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Goal
        </button>
      </div>

      {showCreateForm ? (
        <CreateGoalForm onSuccess={() => setShowCreateForm(false)} />
      ) : (
        <GoalsList goals={userGoals} />
      )}
    </div>
  );
}