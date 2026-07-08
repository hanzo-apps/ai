'use client'


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@hanzo/ui";
import { ArrowLeft, Check, CreditCard } from 'lucide-react';

import { toast } from 'sonner';
import { useBilling } from '@/contexts/BillingContext';
import AnimatedSection, { AnimatedHeading } from '@/components/ui/animated-section';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@hanzo/ui";

const BillingPlans = () => {
  const router = useRouter();
  const { checkout, billingInfo } = useBilling();
  const [isUpgrading, setIsUpgrading] = useState(false);

  // Mirrors https://pricing.hanzo.ai/v1/plans — keep in lockstep.
  const plans = [
    {
      id: 'developer',
      name: 'Developer',
      price: 0,
      interval: 'month',
      description: 'Get started for free with included credits',
      features: [
        '$5 free credit',
        '60 requests/min',
        '100K tokens/min',
        'API access',
        'Community support',
        'Pay-as-you-go after credit'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 49,
      interval: 'month',
      description: 'For developers shipping real products',
      features: [
        'Everything in Developer',
        '500 requests/min',
        '1M tokens/min',
        'Priority inference',
        'Analytics dashboard',
        'Email support'
      ],
      popular: true
    },
    {
      id: 'max',
      name: 'Max',
      price: 200,
      interval: 'month',
      description: 'Maximum AI power for individuals',
      features: [
        'Everything in Pro',
        'Unlimited premium model access',
        '5000 requests/min',
        '10M tokens/min',
        '$100/mo cloud credits included',
        'Dedicated support channel'
      ],
      popular: false
    }
  ];

  const handleUpgrade = async (planId: string) => {
    setIsUpgrading(true);
    
    // Find the plan
    const plan = plans.find(p => p.id === planId);
    if (!plan) {
      toast.error('Invalid plan selected');
      setIsUpgrading(false);
      return;
    }
    
    // Simulate checkout process
    const success = await checkout(planId as any);
    
    if (success) {
      toast.success(`Successfully upgraded to ${plan.name} plan!`);
      router.push('/account/billing');
    }
    
    setIsUpgrading(false);
  };

  return (
    <AnimatedSection>
      <div className="space-y-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" onClick={() => router.push('/account/billing')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Billing
          </Button>
        </div>
        
        <AnimatedHeading>
          <h2 className="text-2xl font-bold mb-6">Choose a Plan</h2>
        </AnimatedHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <Card 
              key={plan.id} 
              className={`bg-neutral-900/30 border ${
                plan.popular ? 'border-white' : 'border-neutral-800'
              } relative`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-[var(--white)] px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-foreground/70 mr-2 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${
                    plan.popular ? 'bg-primary hover:bg-primary/20' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={isUpgrading}
                >
                  {billingInfo.plan === plan.id ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 bg-neutral-900/30 border border-neutral-800 rounded-lg p-6">
          <h3 className="text-xl font-medium mb-4">Enterprise Plan</h3>
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your organization? Our Enterprise plan offers custom pricing, 
            dedicated support, and tailored features for your specific needs.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default BillingPlans;
