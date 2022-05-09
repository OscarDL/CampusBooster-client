import { toast } from 'react-toastify';
import { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, styled, TextField } from '@mui/material';

import { useAppDispatch } from '../../../../../store/store';
import { createTool } from '../../../../../store/features/tools/slice';
import { ToolCategory, ToolLink } from '../../../../../shared/types/tools';
import { Dialog, DialogActions, DialogContent, DialogTitle, MainDialogButton } from '../../../../shared/dialog';


type Props = {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const Input = styled('input')({display: 'none'});


const CreateTool: FC<Props> = ({open, setOpen}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const image = useRef<File>();
  const [loading, setLoading] = useState(false);
  const [tool, setTool] = useState<ToolLink>({
    img: '', url: '', title: '', category: 'general', description: ''
  });


  const handleAddImage = (e: React.FormEvent<HTMLInputElement>) => {
    const result = e.target as HTMLInputElement;
    const file = result.files?.[0];

    if (!file) {
      setTool({...tool, img: ''});
      image.current = undefined;
      return;
    }

    image.current = file;
    setTool({...tool, img: file.name});
  };

  const handleRemoveImage = () => {
    image.current = undefined;
    setTool({...tool, img: ''});
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const toolData = new FormData();
    toolData.append('url', tool.url);
    toolData.append('title', tool.title);
    toolData.append('category', tool.category);
    toolData.append('description', tool.description);
    if (image.current) toolData.append('file', image.current);

    try {
      await dispatch(createTool(toolData)).unwrap();

      setOpen(false);
      toast.success(t('tools.create.success', {tool: tool.title}));
      setTool({img: '', url: '', title: '', category: 'general', description: ''});
    }
    catch (error: any) {
      toast.error(error);
    }

    setLoading(false);
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
              value={tool.category}
              labelId="demo-select-small" label={t('tools.create.category')}
              onChange={e => setTool({...tool, category: e.target.value as ToolCategory})}
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
              value={tool?.title ?? ''}
              label={t('tools.create.name')}
              onChange={e => setTool({...tool, title: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              variant="standard"
              value={tool?.url ?? ''}
              label={t('tools.create.url')}
              onChange={e => setTool({...tool, url: e.target.value})}
            />
          </div>

          <TextField
            sx={{mb: 2}} margin="normal"
            required fullWidth multiline
            value={tool?.description ?? ''}
            label={t('tools.create.description')}
            onChange={e => setTool({...tool, description: e.target.value})}
          />

          <div className="MuiDialogContent-row">
            <label htmlFor="button-file" style={{flexGrow: 0}}>
              <Input
                type="file"
                id="file-btn"
                accept="image/*"
                onInput={handleAddImage}
              />
              <Button variant="contained" component="span">
                {t('tools.create.image')}
              </Button>
            </label>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
              {tool.img && (
                <IconButton sx={{p: '6px', mr: 1}} color="error" onClick={handleRemoveImage}>
                  <CloseIcon/>
                </IconButton>
              )}

              <span className="text-overflow">{tool.img || t('tools.create.no_image')}</span>
            </Box>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            {t('global.cancel')}
          </Button>

          <MainDialogButton
            type="submit" variant="contained" loading={loading}
            disabled={!(tool.title && tool.description && tool.url)}
          >
            {t('global.confirm')}
          </MainDialogButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};


export default CreateTool;
