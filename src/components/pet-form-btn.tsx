import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

type IPetFormBtn = {
  actionType: 'add' | 'edit';
};

export default function PetFormBtn({ actionType }: IPetFormBtn) {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-5 self-end" type="submit" disabled={pending}>
      {actionType === 'add' ? 'Add a new pet' : 'Edit pet'}
    </Button>
  );
}
