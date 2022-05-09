import copy from 'fast-copy';
import { toast } from 'react-toastify';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Close, Replay } from '@mui/icons-material';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { updateTool } from '../../../../../store/features/tools/slice';
import { ToolCategory, ToolLink } from '../../../../../shared/types/tools';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  tool: ToolLink,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const Input = styled('input')({display: 'none'});


const UpdateTool: FC<Props> = ({open, tool, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const image = useRef<File>();
  const [loading, setLoading] = useState(false);
  const [newTool, setNewTool] = useState(copy(tool));


  const handleAddImage = (e: React.FormEvent<HTMLInputElement>) => {
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

  const handleRemoveImage = () => {
    image.current = undefined;
    setNewTool({...newTool, img: ''});
  };

  const handleResetImage = () => {
    image.current = undefined;
    setNewTool({...newTool, img: tool.img});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toolData = new FormData();
    toolData.append('img', newTool.img);
    toolData.append('url', newTool.url);
    toolData.append('title', newTool.title);
    toolData.append('category', newTool.category);
    toolData.append('description', newTool.description);
    if (image.current) toolData.append('file', image.current);

    try {
      await dispatch(updateTool({id: tool.id!, toolData})).unwrap();

      setOpen(false);
      toast.success(t('tools.update.success', {tool: tool.title}));
      setNewTool({img: '', url: '', title: '', category: 'general', description: ''});
    }
    catch (error: any) {
      toast.error(error);
    }

    setLoading(false);
  };


  useEffect(() => {
    // Reset state on new dialog open
    if (open) setNewTool(copy(tool));
  }, [open, tool]);


  return (
    <Dialog
      onClose={() => setOpen(false)}
      open={open} fullWidth maxWidth="sm"
    >
      <DialogTitle>{t('tools.update.title', {tool: tool.title})}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <FormControl>
            <InputLabel id="demo-select-small">{t('tools.update.category')}</InputLabel>
            <Select
              size="small" sx={{mb: 2}}
              value={newTool.category}
              labelId="demo-select-small" label={t('tools.update.category')}
              onChange={e => setNewTool({...newTool, category: e.target.value as ToolCategory})}
            >
              <MenuItem value="general">{t('tools.general')}</MenuItem>
              <MenuItem value="development">{t('tools.development')}</MenuItem>
              <MenuItem value="infrastructure">{t('tools.infrastructure')}</MenuItem>
              <MenuItem value="net-sec">{t('tools.net-sec')}</MenuItem>
            </Select>
          </FormControl>

          <div className="MuiDialogContent-row">
            <TextField
              required
              margin="dense"
              variant="standard"
              value={newTool?.title ?? ''}
              label={t('tools.update.name')}
              onChange={e => setNewTool({...newTool, title: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              variant="standard"
              value={newTool?.url ?? ''}
              label={t('tools.update.url')}
              onChange={e => setNewTool({...newTool, url: e.target.value})}
            />
          </div>

          <TextField
            sx={{mb: 2}} margin="normal"
            required fullWidth multiline
            value={newTool?.description ?? ''}
            label={t('tools.update.description')}
            onChange={e => setNewTool({...newTool, description: e.target.value})}
          />

          <div className="MuiDialogContent-row">
            <label htmlFor="file-btn" style={{flexGrow: 0}}>
              <Input
                type="file"
                id="file-btn"
                accept="image/*"
                onInput={handleAddImage}
              />
              <Button variant="contained" component="span">
                {t('tools.update.image')}
              </Button>
            </label>

            <Box sx={{display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
              {tool.img && (
                <IconButton sx={{p: '6px', mr: 1}} color="error" onClick={handleRemoveImage}>
                  <Close/>
                </IconButton>
              )}

              <IconButton sx={{p: '6px', mr: 1}} onClick={handleResetImage}>
                <Replay/>
              </IconButton>

              <span className="text-overflow">{newTool.img || t('tools.update.no_image')}</span>
            </Box>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            {t('global.cancel')}
          </Button>

          <MainDialogButton
            type="submit" variant="contained" loading={loading}
            disabled={!(newTool.title && newTool.description && newTool.url)}
          >
            {t('global.confirm')}
          </MainDialogButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default UpdateTool;
