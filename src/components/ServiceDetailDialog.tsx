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
  'Mercedes Repair': 'Our Mercedes-Benz specialists deliver factory-standard diagnostics and repair using genuine OEM parts. From AMG performance tuning to routine servicing, we handle all models including C-Class, E-Class, S-Class, GLE, and GLC. Every repair follows Mercedes-Benz workshop protocols to maintain vehicle integrity.',
  'Mechanical Repair': 'Comprehensive mechanical repair covering engine rebuilds, timing belt/chain replacement, gasket repairs, coolant system overhauls, and drivetrain servicing. Our technicians use precision tooling and diagnostic equipment to identify and resolve issues at the root cause — not just the symptoms.',
  'Transmission Services': 'Full-spectrum transmission care including automatic and manual gearbox repair, CVT servicing, clutch replacement, torque converter rebuilds, and transmission fluid flushes. We perform complete diagnostics before any work to ensure accurate, cost-effective repairs.',
  'Suspension Repair': 'Restore ride comfort and handling precision with our suspension services. We cover shock absorber and strut replacement, spring repairs, control arm bushings, sway bar links, and full suspension geometry alignment for all vehicle types.',
  'Steering Repair': 'Expert steering system repair including power steering pump replacement, rack and pinion repair, tie rod replacement, steering column service, and electronic power steering (EPS) diagnostics. We ensure precise, responsive steering feel.',
  'Brake System Repairs': 'Safety-critical brake servicing including pad and rotor replacement, brake caliper rebuilds, brake line inspection, ABS module diagnostics, and brake fluid flushes. We use OEM and performance-grade parts for maximum stopping power.',
  'Routine Maintenance': 'Scheduled maintenance packages tailored to your vehicle\'s manufacturer recommendations. Includes multi-point inspections, fluid top-ups, filter replacements, belt checks, and digital service records to keep your car running at peak performance.',
  'Oil Change Service': 'Premium oil change service using fully synthetic, semi-synthetic, or manufacturer-specified oils. Includes oil filter replacement, fluid level checks, and a complimentary under-hood inspection to catch potential issues early.',
  'Tire Repair': 'Complete tire services including puncture repair, tire rotation, wheel balancing, four-wheel alignment, and new tire fitting from leading brands. We help you choose the right tires for your driving style and conditions.',
  'Battery Changes': 'Fast, professional battery replacement with top-tier brands. Includes electrical system testing, alternator output check, and terminal cleaning. We stock batteries for all vehicle types and can handle start-stop system batteries.',
  'Exhaust Repair': 'Full exhaust system services from catalytic converter repair to muffler replacement, exhaust manifold gaskets, and DPF cleaning. We ensure optimal exhaust flow, emissions compliance, and that signature engine tone.',
  'Car Programming & Diagnostic': 'Advanced ECU coding, key programming, module initialization, and full OBD-II diagnostics. We use dealer-level scan tools to read fault codes, perform live data analysis, and reset service indicators across all makes and models.',
  'Electrical System Repairs': 'Comprehensive electrical diagnostics and repair covering alternators, starters, wiring harnesses, fuse boxes, lighting systems, window regulators, and sensor calibration. We trace and resolve even the most complex electrical faults.',
  'Fuel System Repair': 'Fuel system diagnostics and repair including injector cleaning/replacement, fuel pump service, fuel filter replacement, fuel rail pressure testing, and throttle body cleaning for optimal combustion efficiency and fuel economy.',
  'AC Repair & Maintenance': 'Complete climate control services including refrigerant recharge, compressor replacement, condenser and evaporator repair, cabin filter replacement, and full system leak detection. Stay comfortable in any weather.',
  'Car Body Repair': 'Precision body repair for dents, scratches, scrapes, cracked bumpers, and minor collision damage. We use paintless dent removal, panel beating, and filler techniques to restore your vehicle\'s appearance to factory condition.',
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
