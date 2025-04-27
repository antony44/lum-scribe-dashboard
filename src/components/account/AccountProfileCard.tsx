
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/components/ui/sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';

const ProfileEditForm = ({ 
  user, 
  profile, 
  onCancel 
}: { 
  user: User, 
  profile: any, 
  onCancel: () => void 
}) => {
  const [firstName, setFirstName] = useState(profile.first_name || '');
  const [lastName, setLastName] = useState(profile.last_name || '');
  const [email, setEmail] = useState(profile.email || '');
  const { updateProfile, isLoading } = useUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(user, { 
      first_name: firstName, 
      last_name: lastName, 
      email 
    });
    if (success) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label>Prénom</label>
        <Input 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="Votre prénom" 
        />
      </div>
      <div className="space-y-2">
        <label>Nom</label>
        <Input 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Votre nom" 
        />
      </div>
      <div className="space-y-2">
        <label>Email</label>
        <Input 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Votre email" 
        />
      </div>
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  );
};

const AccountProfileCard = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { 
    data: profile, 
    isLoading 
  } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (!user || isLoading) return null;

  const getInitials = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const avatarUrl = profile?.avatar_url || 'https://i.pravatar.cc/150?img=32';

  return (
    <Card className="border shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={avatarUrl} alt="Votre avatar" />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <span className="text-xs text-white font-medium">Changer</span>
            </div>
          </div>
          
          {!isEditing ? (
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {profile?.first_name} {profile?.last_name}
                  </h2>
                  <p className="text-muted-foreground">{profile?.email}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="default" 
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Modifier
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <ProfileEditForm 
                user={user} 
                profile={profile} 
                onCancel={() => setIsEditing(false)} 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountProfileCard;
