import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ServiceDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    title: string;
    description: string;
    image: string;
    details?: string;
  } | null;
}

const serviceDetails: Record<string, string> = {
  'Mercedes Repair': 'Mercedes-Benz diagnostics, maintenance, and repair are scoped from the vehicle model, year, VIN, and reported fault. The inspection determines the applicable procedure, compatible diagnostic platform, and parts options, which are documented in the estimate before work begins.',
  'Mechanical Repair': 'Comprehensive mechanical repair covering engine rebuilds, timing belt/chain replacement, gasket repairs, coolant system overhauls, and drivetrain servicing. Our technicians use precision tooling and diagnostic equipment to identify and resolve issues at the root cause — not just the symptoms.',
  'Transmission Services': 'Full-spectrum transmission care including automatic and manual gearbox repair, CVT servicing, clutch replacement, torque converter rebuilds, and transmission fluid flushes. We perform complete diagnostics before any work to ensure accurate, cost-effective repairs.',
  'Suspension Repair': 'Suspension services can include shock absorber and strut replacement, spring repairs, control arm bushings, sway bar links, and geometry alignment. Vehicle compatibility and the required repair are confirmed after inspection.',
  'Steering Repair': 'Expert steering system repair including power steering pump replacement, rack and pinion repair, tie rod replacement, steering column service, and electronic power steering (EPS) diagnostics. We ensure precise, responsive steering feel.',
  'Brake System Repairs': 'Brake servicing can include pad and rotor replacement, caliper repair, brake line inspection, ABS diagnostics, and brake fluid replacement. The estimate identifies the parts and fluid specification suitable for the exact vehicle.',
  'Routine Maintenance': 'Scheduled maintenance packages tailored to your vehicle\'s manufacturer recommendations. Includes multi-point inspections, fluid top-ups, filter replacements, belt checks, and digital service records to keep your car running at peak performance.',
  'Oil Change Service': 'Oil and filter selection is based on the vehicle manufacturer specification and confirmed service scope. The service can include fluid-level checks and an under-hood inspection when listed in the estimate.',
  'Tire Repair': 'Tire services can include puncture assessment, rotation, balancing, alignment, and new tire fitting. Size, load rating, speed rating, vehicle marking, and product availability are confirmed for the exact vehicle.',
  'Battery Changes': 'Battery replacement begins with battery and charging-system tests. Battery type, capacity, coding requirements, availability, and expected completion time are confirmed for the exact vehicle before replacement.',
  'Exhaust Repair': 'Full exhaust system services from catalytic converter repair to muffler replacement, exhaust manifold gaskets, and DPF cleaning. We ensure optimal exhaust flow, emissions compliance, and that signature engine tone.',
  'Car Programming & Diagnostic': 'Diagnostic work can include fault-code analysis, live data, service resets, and supported module functions. Coding, key, initialization, and software access depend on the exact vehicle, compatible platform, and confirmed scope.',
  'Electrical System Repairs': 'Comprehensive electrical diagnostics and repair covering alternators, starters, wiring harnesses, fuse boxes, lighting systems, window regulators, and sensor calibration. We trace and resolve even the most complex electrical faults.',
  'Fuel System Repair': 'Fuel system diagnostics and repair including injector cleaning/replacement, fuel pump service, fuel filter replacement, fuel rail pressure testing, and throttle body cleaning for optimal combustion efficiency and fuel economy.',
  'AC Repair & Maintenance': 'Climate-control work can include refrigerant service, leak testing, compressor, condenser, evaporator, filter and control-system checks. Compatibility, parts and timing are confirmed for the exact vehicle.',
  'Car Body Repair': 'Body repair can include dents, scratches, cracked bumpers and minor collision damage using PDR, panel repair and refinishing methods. The achievable finish depends on the damage and existing paint condition.',
  'Car Paint & Protection': 'Professional paint correction, ceramic coating application, and paint protection film (PPF) installation. We offer full-body or partial wraps, color-matched touch-ups, and multi-layer ceramic coatings for lasting shine and protection.',
};

export const ServiceDetailDialog: React.FC<ServiceDetailDialogProps> = ({
  open,
  onOpenChange,
  service,
}) => {
  if (!service) return null;

  const details = serviceDetails[service.title] || service.description;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-charcoal border-gray-700 text-off-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-burnt-orange">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="overflow-hidden rounded-2xl aspect-video">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop';
              }}
            />
          </div>

          <div>
            <h4 className="text-lg font-semibold text-off-white mb-3">Service Details</h4>
            <p className="text-gray-300 leading-relaxed">{details}</p>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};
