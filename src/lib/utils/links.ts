import { 
  Home,
  Building2,
  Users,
  Calendar,
  Clock,
  Target,
  GraduationCap,
  FileText,
  BarChart2,
  Settings,
  Briefcase,
  DollarSign,
  Shield
} from 'lucide-react';
import { Role } from '../types/auth';

export interface NavLink {
  name: string;
  href: string;
  icon: any;
  roles: Role[];
}

export const mainNavLinks: NavLink[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard',
    icon: Home,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE', 'STAKEHOLDER']
  },
  { 
    name: 'Organizations', 
    href: '/organizations',
    icon: Building2,
    roles: ['SUPER_ADMIN']
  },
  { 
    name: 'Team', 
    href: '/team',
    icon: Users,
    roles: ['ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER']
  },
  { 
    name: 'Leave Management', 
    href: '/leave',
    icon: Calendar,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  { 
    name: 'Time & Attendance', 
    href: '/attendance',
    icon: Clock,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  { 
    name: 'Performance', 
    href: '/performance',
    icon: Target,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  { 
    name: 'Training', 
    href: '/training',
    icon: GraduationCap,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR', 'EMPLOYEE']
  },
  { 
    name: 'Documents', 
    href: '/documents',
    icon: FileText,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'EMPLOYEE']
  },
  { 
    name: 'Reports', 
    href: '/reports',
    icon: BarChart2,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER']
  },
  { 
    name: 'Payroll', 
    href: '/payroll',
    icon: DollarSign,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'EMPLOYEE']
  },
  { 
    name: 'Recruitment', 
    href: '/recruitment',
    icon: Briefcase,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
  },
  { 
    name: 'Safety', 
    href: '/safety',
    icon: Shield,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER', 'DEPT_MANAGER', 'SUPERVISOR']
  },
  { 
    name: 'Settings', 
    href: '/settings',
    icon: Settings,
    roles: ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER']
  }
];