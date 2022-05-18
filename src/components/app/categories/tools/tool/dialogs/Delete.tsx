import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../../store/store';
import { deleteTool } from '../../../../../../store/features/tools/slice';
import { ToolLinkBase64Image } from '../../../../../../shared/types/tools';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../../shared/dialog';


type Props = {
  open: boolean,
  tool: ToolLinkBase64Image,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const DeleteTool: FC<Props> = ({tool, open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);


  const handleDeleteTool = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(deleteTool(tool.id!)).unwrap();

      setTitle('');
      setOpen(false);
      toast.success(t('tools.delete.success', {tool: tool.title}));
    }
    catch (error: any) {
      toast.error(error);
    };

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setTitle('');
  }, [open]);


  return (
    <Dialog
      onSubmit={handleDeleteTool}
      components={{Root: 'form'}}
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('tools.delete.title', {tool: tool.title})}</DialogTitle>

      <DialogContent sx={{pt: '0 !important'}}>
        <p>{t('tools.delete.text')}</p>

        <TextField
          required autoFocus
          label={t('tools.delete.name')}
          margin="dense" variant="standard"
          onChange={e => setTitle(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={() => setOpen(false)}>
          {t('global.cancel')}
        </Button>

        <MainDialogButton
          type="submit" color="error" variant="contained"
          loading={loading} disabled={tool.title !== title}
        >
          {t('global.confirm')}
        </MainDialogButton>
      </DialogActions>
    </Dialog>
  );
};


export default DeleteTool;
