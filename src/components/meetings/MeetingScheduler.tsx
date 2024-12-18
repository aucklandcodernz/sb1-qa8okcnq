import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, MapPin, Video, Users, Plus, Minus, Phone } from 'lucide-react';
import { MeetingType, MeetingLocation } from '../../types/meetings';
import { cn } from '../../lib/utils';

// Rest of the file remains the same...