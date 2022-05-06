import copy from 'fast-copy';
import { toast } from 'react-toastify';
import isEqual from 'react-fast-compare';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, FormControl, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { ToolCategory, ToolLink } from '../../../../../shared/types/tools';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  tool: ToolLink,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const Input = styled('input')({display: 'none'});


const UpdateTool: FC<Props> = ({open, tool, setOpen}) => {
  const { t } = useTranslation();

  const image = useRef<File>();
  const [newTool, setNewTool] = useState<ToolLink>(copy(tool));


  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
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

        // Upload image to special API route for CDN upload if necessary
      }

      // Then make a (second) request to update the tool in DB

      setOpen(false);
      toast.success(t('tools.update.success'));
    }

    catch (error) {
      toast.error(String(error));
    }
  };


  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('tools.create.title')}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl>
            <InputLabel id="demo-select-small">{t('tools.create.category')}</InputLabel>
            <Select
              size="small" sx={{mb: 2}}
              value={newTool.category}
              labelId="demo-select-small" label={t('tools.create.category')}
              onChange={e => setNewTool({...newTool, category: e.target.value as ToolCategory})}
            >
              <MenuItem value="general">{t('tools.general.tab')}</MenuItem>
              <MenuItem value="development">{t('tools.development.tab')}</MenuItem>
              <MenuItem value="infrastructure">{t('tools.infrastructure.tab')}</MenuItem>
              <MenuItem value="net-sec">{t('tools.net-sec.tab')}</MenuItem>
            </Select>
          </FormControl>

          <div className="MuiDialogContent-row">
            <TextField
              required
              margin="dense"
              variant="standard"
              value={newTool?.title ?? ''}
              label={t('tools.create.name')}
              onChange={e => setNewTool({...newTool, title: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              variant="standard"
              value={newTool?.url ?? ''}
              label={t('tools.create.url')}
              onChange={e => setNewTool({...newTool, url: e.target.value})}
            />
          </div>

          <TextField
            sx={{mb: 2}} margin="normal"
            required fullWidth multiline
            value={newTool?.description ?? ''}
            label={t('tools.create.description')}
            onChange={e => setNewTool({...newTool, description: e.target.value})}
          />

          <div className="MuiDialogContent-row">
            <label htmlFor="contained-button-file" style={{flexGrow: 0}}>
              <Input
                type="file"
                accept="image/*"
                id="contained-button-file"
                onInput={handleImageChange}
              />
              <Button variant="contained" component="span">
                {t('tools.create.image')}
              </Button>
            </label>

            <span className="text-overflow">{newTool.img || t('tools.create.no_image')}</span>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            {t('global.cancel')}
          </Button>

          <Button
            type="submit"
            className="MuiDialogButton-confirm"
            disabled={!(newTool.title && newTool.description && newTool.url) || isEqual(tool, newTool)}
          >
            {t('global.confirm')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default UpdateTool;
