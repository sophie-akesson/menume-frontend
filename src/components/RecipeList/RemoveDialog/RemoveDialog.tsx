import Button from '@components/Button';
import { RemoveDialogProps } from './types';

const RemoveDialog = ({ setShowDialog, removeRecipe }: RemoveDialogProps) => {
  return (
    <>
      <div>
        <h2>Är du säker på att du vill ta bort receptet?</h2>
      </div>
      <div className='buttonWrapper'>
        <Button
          type='button'
          orientation='left'
          onClick={() => {
            removeRecipe();
          }}
        >
          Ja
        </Button>
        <Button
          type='button'
          orientation='right'
          onClick={() => {
            setShowDialog({ show: false, id: 0 });
          }}
        >
          Nej
        </Button>
      </div>
    </>
  );
};

export default RemoveDialog;
