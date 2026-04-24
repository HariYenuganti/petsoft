'use client';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { usePetContext } from '@/lib/hooks';
import PetFormBtn from './pet-form-btn';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petFormSchema, PetFormValues } from '@/lib/validations';

type PetFormProps = {
  actionType: 'add' | 'edit';
  onFormSubmit: () => void;
};

export default function PetForm({ actionType, onFormSubmit }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<PetFormValues>({
    resolver: zodResolver(petFormSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            name: selectedPet?.name,
            ownerName: selectedPet?.ownerName,
            imageUrl: selectedPet?.imageUrl,
            age: selectedPet?.age,
            notes: selectedPet?.notes,
          }
        : undefined,
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        onFormSubmit();
        const petData = getValues();

        if (actionType === 'add') {
          await handleAddPet(petData);
        } else if (actionType === 'edit') {
          await handleEditPet(selectedPet!.id, petData);
        }

        toast.success(
          actionType === 'add' ? 'Guest added' : 'Guest updated',
        );
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" variant="underline" {...register('name')} />
          {errors.name && (
            <p className="text-alert text-[12px] italic font-serif">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ownerName">Owner name</Label>
          <Input id="ownerName" variant="underline" {...register('ownerName')} />
          {errors.ownerName && (
            <p className="text-alert text-[12px] italic font-serif">
              {errors.ownerName.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="imageUrl">Photo URL</Label>
          <Input id="imageUrl" variant="underline" {...register('imageUrl')} />
          {errors.imageUrl && (
            <p className="text-alert text-[12px] italic font-serif">
              {errors.imageUrl.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            variant="underline"
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-alert text-[12px] italic font-serif">
              {errors.age.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register('notes')} rows={3} />
          {errors.notes && (
            <p className="text-alert text-[12px] italic font-serif">
              {errors.notes.message}
            </p>
          )}
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}
