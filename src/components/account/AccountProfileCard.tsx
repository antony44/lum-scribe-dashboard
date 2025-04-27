
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/components/ui/sonner";
import { useQuery } from "@tanstack/react-query";
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
  const { updateProfile, uploadAvatar, isLoading } = useUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await updateProfile(user, { 
      first_name: firstName, 
      last_name: lastName, 
      email 
    });
    if (success) onCancel();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadAvatar(user, file);
      if (url) {
        toast.success("Avatar mis à jour avec succès");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border-4 border-white shadow-md">
          <AvatarImage src={profile.avatar_url} alt="Votre avatar" />
          <AvatarFallback>{profile.first_name?.[0]}{profile.last_name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="avatar-upload"
          />
          <label 
            htmlFor="avatar-upload" 
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition-colors inline-block"
          >
            Changer l'avatar
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Prénom</label>
        <Input 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="Votre prénom"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Nom</label>
        <Input 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Votre nom"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Email</label>
        <Input 
          type="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Votre email"
        />
      </div>

      <div className="flex gap-4 justify-end">
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

  return (
    <Card className="border shadow-sm animate-fade-in">
      <CardContent className="p-6">
        {!isEditing ? (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-white shadow-md">
                <AvatarImage src={profile?.avatar_url} alt="Votre avatar" />
                <AvatarFallback>{profile?.first_name?.[0]}{profile?.last_name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">
                  {profile?.first_name} {profile?.last_name}
                </h2>
                <p className="text-muted-foreground">{profile?.email}</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setIsEditing(true)}
              className="w-full"
            >
              Modifier le profil
            </Button>
          </div>
        ) : (
          <ProfileEditForm 
            user={user} 
            profile={profile} 
            onCancel={() => setIsEditing(false)} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default AccountProfileCard;
