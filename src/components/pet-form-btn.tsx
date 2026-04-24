import { Button } from './ui/button';

type PetFormBtnProps = {
  actionType: 'add' | 'edit';
};

export default function PetFormBtn({ actionType }: PetFormBtnProps) {
  return (
    <Button className="self-end" type="submit">
      {actionType === 'add' ? 'Welcome guest' : 'Update'}
    </Button>
  );
}
