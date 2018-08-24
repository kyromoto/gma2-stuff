-- PLUGIN: Presets2Sequence
-- AUTOR: info@oliverrademaker.de

gma.echo("PLugin Preset2Sequence loading ...");

function Start()
  local group = gma.textinput("Please set group number ..", "");
  gma.echo("Group: " .. group);

  local presetType = gma.textinput("Please set preset type number ..", "");
  gma.echo("Preset type: " .. presetType);

  local preset = "";
  local presets = {};

  repeat
    preset = gma.textinput("Next preset number or \"q\" for end ..", preset);
    if(preset ~= "q") then
      table.insert(presets, preset);
      gma.echo("Preset: " .. preset);
    end
  until(preset == "q");

  --gma.echo("Presets : " .. table.tostring(presets));

  local sequence = gma.textinput("Please set sequence number ..", "");
  gma.echo("Sequence number: " .. sequence);

  if(gma.gui.confirm("Please confirm", "Should I generate the sequence with given values?")) then

    -- clear Programmer before start storing cues
    gma.cmd("ClearAll");

    for i = 1, #presets do
      -- select group and preset
      gma.cmd("Group " .. group .. " at Preset " .. presetType .. "." .. presets[i]);

      -- store programmer to sequence.cue
      gma.cmd("Store Sequence " .. sequence .. " Cue " .. i .." /overwrite");

      -- clear programmer after each step
      gma.cmd("ClearAll");

    end
  end
end

function CleanUp()

end

return Start,CleanUp
