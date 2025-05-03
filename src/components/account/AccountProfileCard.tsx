
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/AuthProvider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "@/components/ui/sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { User } from '@supabase/supabase-js';
import { Upload } from 'lucide-react';

const ProfileEditForm = ({ 
  user, 
  profile, 
  onCancel 
}: { 
  user: User, 
  profile: any, 
  onCancel: () => void 
}) => {
  // Use empty strings as fallback values when profile data is not available
  const [firstName, setFirstName] = useState(profile?.first_name || '');
  const [lastName, setLastName] = useState(profile?.last_name || '');
  const [email, setEmail] = useState(profile?.email || user?.email || '');
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadAvatar } = useUserProfile();
  const queryClient = useQueryClient();

  const { 
    data: profile, 
    isLoading,
    error
  } = useQuery({
    queryKey: ['userProfile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('Clients')
        .select('*')
        .eq('id_clients', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      const url = await uploadAvatar(user, file);
      if (url) {
        toast.success("Photo de profil mise à jour");
        // Refresh profile data
        queryClient.invalidateQueries({ queryKey: ['userProfile', user.id] });
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error("Une erreur est survenue lors du téléchargement de l'avatar");
    }
  };

  // Show a loading state while profile data is being fetched
  if (isLoading) {
    return (
      <Card className="border shadow-sm animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p>Chargement du profil...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle error state
  if (error || !user) {
    return (
      <Card className="border shadow-sm animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-40">
            <p>Impossible de charger les informations du profil</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getInitials = () => {
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  const avatarUrl = profile?.avatar_url || null;

  return (
    <Card className="border shadow-sm animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={avatarUrl} alt="Photo de profil" />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          
          {!isEditing ? (
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    {profile?.first_name || ''} {profile?.last_name || ''}
                  </h2>
                  <p className="text-muted-foreground">{profile?.email || user.email}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="default" 
                  onClick={() => setIsEditing(true)}
                >
                  Modifier mes informations
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              {/* Only render the edit form if profile data is available */}
              <ProfileEditForm 
                user={user} 
                profile={profile || {}} 
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
