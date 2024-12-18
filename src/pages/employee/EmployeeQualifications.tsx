
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GraduationCap, Plus } from 'lucide-react';
import FormField from '../../components/ui/FormField';
import Button from '../../components/ui/Button';

export default function EmployeeQualifications() {
  const { id } = useParams();
  const [qualifications, setQualifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newQualification, setNewQualification] = useState({
    degree: '',
    institution: '',
    year: new Date().getFullYear()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQualifications([...qualifications, newQualification]);
    setNewQualification({ degree: '', institution: '', year: new Date().getFullYear() });
    setShowForm(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-gray-400" />
          Qualifications & Education
        </h3>
        <Button onClick={() => setShowForm(true)} className="flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Add Qualification
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg">
          <div className="space-y-4">
            <FormField
              label="Degree/Certificate"
              type="text"
              value={newQualification.degree}
              onChange={(e) => setNewQualification({
                ...newQualification,
                degree: e.target.value
              })}
              required
            />
            <FormField
              label="Institution"
              type="text"
              value={newQualification.institution}
              onChange={(e) => setNewQualification({
                ...newQualification,
                institution: e.target.value
              })}
              required
            />
            <FormField
              label="Year"
              type="number"
              value={newQualification.year}
              onChange={(e) => setNewQualification({
                ...newQualification,
                year: parseInt(e.target.value)
              })}
              required
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Qualification
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {qualifications.map((qual, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900">{qual.degree}</p>
            <p className="mt-1 text-sm text-gray-500">{qual.institution}</p>
            <p className="mt-1 text-sm text-gray-500">Graduated {qual.year}</p>
          </div>
        ))}
        
        {qualifications.length === 0 && !showForm && (
          <div className="text-center py-6 text-gray-500">
            No qualifications added yet
          </div>
        )}
      </div>
    </div>
  );
}
