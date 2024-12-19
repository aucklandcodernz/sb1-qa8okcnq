
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../lib/validations/employee';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { toast } from 'react-hot-toast';

interface CreateEmployeeFormProps {
  organizationId: string;
  onSuccess: () => void;
}

export default function CreateEmployeeForm({ organizationId, onSuccess }: CreateEmployeeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema)
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, organizationId })
      });

      if (!response.ok) {
        throw new Error('Failed to create employee');
      }

      toast.success('Employee created successfully');
      onSuccess();
    } catch (error) {
      toast.error('Failed to create employee');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="First Name"
        {...register('firstName')}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        {...register('lastName')}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Employee ID"
        {...register('employeeId')}
        error={errors.employeeId?.message}
      />
      <Input
        label="Position"
        {...register('position')}
        error={errors.position?.message}
      />
      <Select
        label="Employment Type"
        {...register('employmentType')}
        error={errors.employmentType?.message}
      >
        <option value="FULL_TIME">Full Time</option>
        <option value="PART_TIME">Part Time</option>
        <option value="CONTRACT">Contract</option>
        <option value="TEMPORARY">Temporary</option>
      </Select>
      
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Employee'}
      </Button>
    </form>
  );
}
