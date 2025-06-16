
import React from 'react';
import { Smartphone, Calendar, Award, History, Zap, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppFeatures = () => {
  const features = [
    {
      icon: Calendar,
      title: "Service Booking",
      description: "Schedule appointments instantly with our streamlined booking system. Choose your preferred time slots and services."
    },
    {
      icon: Award,
      title: "Loyalty Points",
      description: "Earn points with every service and unlock exclusive rewards. Track your loyalty status in real-time."
    },
    {
      icon: History,
      title: "Service History",
      description: "Access complete maintenance records and service documentation. Never lose track of your vehicle's care history."
    },
    {
      icon: Zap,
      title: "Real-Time Status",
      description: "Get live updates on your service progress. Know exactly when your vehicle will be ready for pickup."
    },
    {
      icon: QrCode,
      title: "QR Code System",
      description: "Personalized QR codes for quick check-ins and seamless service experiences. Skip the paperwork entirely."
    }
  ];

  return (
    <section className="py-20 bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal/20 to-black"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">DIGI-TEC</span> App
          </h2>
          <p className="text-xl text-off-white/80 max-w-2xl mx-auto">
            Your Garage in Your Pocket
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features Grid */}
          <div className="space-y-8">
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-charcoal/30 backdrop-blur-sm rounded-xl p-6 border border-off-white/10 hover:border-burnt-orange/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-burnt-orange/20 rounded-lg flex items-center justify-center group-hover:bg-burnt-orange/30 transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-burnt-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-burnt-orange transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-off-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-72 h-[600px] bg-gradient-to-b from-charcoal to-black rounded-[3rem] p-2 shadow-2xl">
                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                    <span>9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                      <div className="w-6 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="px-6 py-4 space-y-4">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-white mb-1">DIGI-TEC</h3>
                      <p className="text-off-white/60 text-sm">Performance Center</p>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-burnt-orange/20 rounded-xl p-4 text-center">
                        <Calendar className="w-6 h-6 text-burnt-orange mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Book Service</span>
                      </div>
                      <div className="bg-charcoal/50 rounded-xl p-4 text-center">
                        <Award className="w-6 h-6 text-burnt-orange mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Loyalty</span>
                      </div>
                      <div className="bg-charcoal/50 rounded-xl p-4 text-center">
                        <History className="w-6 h-6 text-burnt-orange mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">History</span>
                      </div>
                      <div className="bg-charcoal/50 rounded-xl p-4 text-center">
                        <Zap className="w-6 h-6 text-burnt-orange mx-auto mb-2" />
                        <span className="text-white text-sm font-medium">Status</span>
                      </div>
                    </div>
                    
                    {/* QR Code Section */}
                    <div className="bg-gradient-to-r from-burnt-orange/20 to-burnt-orange/10 rounded-xl p-4 text-center">
                      <QrCode className="w-12 h-12 text-burnt-orange mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">Your QR Code</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-burnt-orange/20 via-transparent to-burnt-orange/20 rounded-full blur-xl opacity-50"></div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">
            Experience Premium Service Management
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-burnt-orange hover:bg-burnt-orange/90 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 shadow-lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Download the App
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-burnt-orange text-burnt-orange hover:bg-burnt-orange hover:text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105"
            >
              <Award className="w-5 h-5 mr-2" />
              Join Loyalty Program
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
