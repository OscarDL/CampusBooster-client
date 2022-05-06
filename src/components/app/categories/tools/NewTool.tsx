import { toast } from 'react-toastify';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled, TextField } from '@mui/material';

import { ToolLink } from '../../../../shared/types/tools';

import './Tools.css';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const Input = styled('input')({display: 'none'});


const Tools: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();

  const image = useRef<File>();
  const [newTool, setNewTool] = useState<ToolLink>({img: '', url: '', title: '', description: ''});


  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;
    const file = result.files?.[0];

    if (!file) {
      setNewTool({...newTool, img: ''});
      image.current = undefined;
      return;
    }

    image.current = file;
    setNewTool({...newTool, img: file.name});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (image.current) {
        const formData = new FormData();
        formData.append('file', image.current);
        formData.append('fileName', image.current.name);

        // Upload image to special API route for CDN upload
      }

      // Then make a (second) request to add the tool in DB

      setOpen(false);
      toast.success(t('tools.new.success'));
      setNewTool({img: '', url: '', title: '', description: ''});
    }

    catch (error) {
      toast.error(String(error));
    }
  };


  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="sm"
      onClose={() => setOpen(false)}
    >
      <DialogTitle>{t('tools.new.title')}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="MuiDialogContent-row">
            <TextField
              required
              margin="dense"
              variant="standard"
              label={t('tools.new.name')}
              value={newTool?.title ?? ''}
              onChange={e => setNewTool({...newTool, title: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              variant="standard"
              label={t('tools.new.url')}
              value={newTool?.url ?? ''}
              onChange={e => setNewTool({...newTool, url: e.target.value})}
            />
          </div>

          <TextField
            sx={{mb: 2}} margin="normal"
            required fullWidth multiline
            InputLabelProps={{shrink: true}}
            label={t('tools.new.description')}
            value={newTool?.description ?? ''}
            onChange={e => setNewTool({...newTool, description: e.target.value})}
          />

          <div className="MuiDialogContent-row">
            <label htmlFor="contained-button-file" style={{flexGrow: 0}}>
              <Input
                type="file"
                accept="image/*"
                id="contained-button-file"
                onInput={handleInputChange}
              />
              <Button variant="contained" component="span">
                {t('tools.new.image')}
              </Button>
            </label>

            <span>{newTool.img || t('tools.new.no_image')}</span>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            {t('global.cancel')}
          </Button>

          <Button className="MuiDialogButton-confirm" type="submit">
            {t('global.confirm')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default Tools;
