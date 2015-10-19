#!/usr/bin/perl

print "var megahal = new jsMegaHal(4);\n\n";

while(<STDIN>) {
    $line = $_;
    chomp($line);
    $line =~ s/,$//;
    $line =~ s/,//g;
    $line =~ s/'//g;
    $line =~ s/-/ /g;
    $line =~ s/\.//g;
    $line =~ s/;//g;
    $line = lc($line);

    if($line =~ / /) {
        print "megahal.add(\"" . $line . "\");\n";   
    }    
}

